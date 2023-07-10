import json
import re
import os
import tempfile
import shutil
from sqlite3 import connect
import pyterrier as pt
from flask import jsonify, request, make_response, current_app
from backend.app import db
from backend.app.models import QueryTemplate, QueryTemplateSchema
from backend.app.search import search
from backend.parser import markdown_parser
from backend.parser import pdf_parser
from backend.parser import tex_parser
from marshmallow import ValidationError
from backend.config import Config
from backend.app.main import bp
from pathlib import Path
from .utils import get_methods_from_git_repo, create_index_from_methods

URL_PREFIX = "/api/v1"


@bp.route("/")
def index():
    return current_app.send_static_file("index.html")


@bp.route(f"{URL_PREFIX}/search")
def search_route():
    text = request.args.get("text")
    code = request.args.get("code")
    equation = request.args.get("equations")
    _id = request.args.get("id")
    exchange = request.args.get("exchange") or "physics,stackexchange"
    exchange = exchange.split(",")
    model = request.args.get("model")
    model_language = request.args.get("model-language")
    db_name = request.args.get("database")
    index = request.args.get("index")
    page = request.args.get("page", 1, type=int)

    return search(
        db_name, text, code, equation, _id, exchange, model, model_language, index, page
    )


@bp.route(f"{URL_PREFIX}/relevance", methods=["POST"])
def relevance():
    data = json.loads(request.data)

    con, cur = db.create_connection()
    cur.execute(
        "INSERT INTO relevances (id, query, relevant) VALUES (?, ?, ?)",
        (data["result_id"], json.dumps(data["query"]), data["value"]),
    )
    con.commit()
    con.close()

    return "", 204


@bp.route(f"{URL_PREFIX}/document")
def get_document():
    id = request.args.get("id")
    table_name = Config.get_db_table_name()
    document = db.get_results_by_id(table_name, [id], ["text"])[0][0]
    return {"document": re.subn(r"<img", '<img style="max-width: 100%"', document)[0]}


def allowed_file(filename):
    allowed_extensions = {"pdf", "tex", "md"}
    return "." in filename and filename.rsplit(".", 1)[1].lower() in allowed_extensions


@bp.route(f"{URL_PREFIX}/file", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return "No file present", 400
    file = request.files["file"]
    if file.filename == "":
        return "No filename present", 400
    if file and allowed_file(file.filename):
        model_language = request.form.get("model-language")
        if file.filename.endswith(".pdf"):
            return search(db, text=pdf_parser.get_abstract(file))
        if file.filename.endswith(".tex"):
            text, equations = tex_parser.search(file)
            return search(db, text=text, equation=max(equations, key=len, default=""))
        if file.filename.endswith(".md"):
            text, code, equations = markdown_parser.search(file)
            return search(
                db, text=text, code=code, equation=max(equations, key=len, default="")
            )
    else:
        return "Only PDFs are allowed file types", 403


@bp.route(f"{URL_PREFIX}/data-structure")
def get_data_structure():
    data_path = Config.get_data_path()
    tree = {}
    for db in os.listdir(data_path):
        db_path = os.path.join(data_path, db)
        if os.path.isdir(db_path):
            tree[db] = {}
            for model in os.listdir(db_path):
                model_path = os.path.join(db_path, model)
                if os.path.isdir(model_path):
                    tree[db][model] = []
                    for index in os.listdir(model_path):
                        index_path = os.path.join(model_path, index)
                        if os.path.isdir(index_path):
                            tree[db][model].append(index)

    return jsonify(tree)


@bp.route(f"{URL_PREFIX}/query-templates")
def get_all_query_templates():
    all_templates = QueryTemplate.query.all()
    schema = QueryTemplateSchema(many=True)
    results = schema.dump(all_templates)
    return jsonify(results)


@bp.route(f"{URL_PREFIX}/query-templates/<id>", methods=["DELETE"])
def delete_query_template_by_id(id):
    query_template = QueryTemplate.query.get(id)
    db.session.delete(query_template)
    db.session.commit()
    return jsonify(query_template.as_dict())


@bp.route(f"{URL_PREFIX}/query-templates", methods=["POST"])
def create_query_template():
    schema = QueryTemplateSchema()
    json_data = request.get_json()
    if not json_data:
        return {"message": "No input data provided"}, 400
    # Validate and deserialize input
    try:
        data = schema.load(json_data)
    except ValidationError as err:
        return {"errors": err.messages}, 422
    # Create new QueryTemplate
    query_template = QueryTemplate()
    query_template.from_dict(data)
    db.session.add(query_template)
    db.session.commit()
    result = schema.dump(QueryTemplate.query.get(query_template.id))
    return {"message": "Created new Query Template.", "queryTemplate": result}


@bp.route(f"{URL_PREFIX}/configs", methods=["GET"])
def get_config_vars():
    default_allowed_search_modes = {
        "default": True,
        "separated": True,
        "url": True,
        "file": True,
    }
    config_vars = {
        "db_path": Config.DB_PATH if Config.DB_PATH else "",
        "db_table_name": Config.DB_TABLE_NAME if Config.DB_TABLE_NAME else "",
        "db_content_attribute_name": Config.DB_CONTENT_ATTRIBUTE_NAME
        if Config.DB_CONTENT_ATTRIBUTE_NAME
        else "",
        "index_path": Config.INDEX_PATH if Config.INDEX_PATH else "",
        "allowed_search_modes": Config.ALLOWED_SEARCH_MODES
        if Config.ALLOWED_SEARCH_MODES
        else default_allowed_search_modes,
        "expansion_methods": Config.get_expansion_methods(),
    }
    return make_response(jsonify(config_vars), 200)


@bp.route(f"{URL_PREFIX}/configs", methods=["POST"])
def update_config_vars():
    json_data = request.get_json()
    modified_fields = []

    if json_data["index_path"] != "":
        Config.INDEX_PATH = json_data["index_path"]
    else:
        Config.INDEX_PATH = None

    if json_data["db_path"] != "":
        Config.DB_PATH = json_data["db_path"]
    else:
        Config.DB_PATH = None

    if json_data["db_table_name"] != "":
        Config.DB_TABLE_NAME = json_data["db_table_name"]
    else:
        Config.DB_TABLE_NAME = None

    if json_data["db_content_attribute_name"] != "":
        Config.DB_CONTENT_ATTRIBUTE_NAME = json_data["db_content_attribute_name"]
    else:
        Config.DB_CONTENT_ATTRIBUTE_NAME = None

    if "allowed_search_modes" in json_data:
        Config.ALLOWED_SEARCH_MODES = json_data["allowed_search_modes"]
    else:
        Config.ALLOWED_SEARCH_MODES = {
            "default": True,
            "separated": True,
            "url": True,
            "file": True,
        }

    return make_response(jsonify(Config.to_dict()), 201)


@bp.route(f"{URL_PREFIX}/index", methods=["POST"])
def selfindex_route():
    json_data = request.get_json()
    url = json_data["url"]
    database = json_data["database"]
    model = json_data["model"]
    indexing_mode = json_data["indexingMode"]
    expansion_method = json_data["expansionMethod"]

    # TODO: for now, we only supoprt java
    methods = get_methods_from_git_repo(url, "java")

    # Decide which database to use
    if indexing_mode == "CREATE":
        database_dir = Path(Config.get_data_path()) / database
        if database_dir.exists():
            raise Exception(
                "Invalid database name. A database with this name already exists."
            )
        else:
            database_dir.mkdir()

        con = connect(database_dir / f"{database}.db")
        cur = con.cursor()
        cur.execute(
            "CREATE TABLE IF NOT EXISTS documents ("
            "id INTEGER PRIMARY KEY AUTOINCREMENT,"
            "title TEXT,"
            "language TEXT NOT NULL,"
            "url TEXT,"
            "body TEXT"
            ");"
        )
    elif indexing_mode == "UPDATE":
        database_path = Path(Config.get_data_path()) / database / f"{database}.db"
        if not database_path.exists():
            raise Exception(
                "Error when updating existing database. The database path does not exist."
            )
        con = connect(database_path)
        cur = con.cursor()
    else:
        raise Exception("Invalid indexing mode")

    # Add methods to database
    for m in methods:
        cur.execute(
            """
        INSERT INTO documents(title, language, url, body)
        VALUES(?,?,?,?)""",
            (m["identifier"], m["language"], m["url"], m["function"]),
        )
        m["id"] = cur.lastrowid
    # Apply database changes
    con.commit()

    # Create index for new methods
    tmp_dir = tempfile.TemporaryDirectory()
    indexref = create_index_from_methods(methods, tmp_dir)
    new_index = pt.IndexFactory.of(indexref)

    if indexing_mode == "CREATE":
        print('TODO: save new_index')
        src_path = Path(tmp_dir.name)
        target_path = Path(Config.get_data_path()) / database / model / 'myIndex'
        destination = shutil.copytree(src_path, target_path)
        print(destination)

    elif indexing_mode == 'UPDATE':
        print('TODO: Merge new index into old')
        # index1 = pt.IndexFactory.of("./index1")
        # index2 = pt.IndexFactory.of("./index2")
        # comb_index = index1 + index2
        # br = pt.BatchRetrieve(comb_index)
    else:
        raise Exception('Invalid indexing mode.')

    response = {'num_methods_indexed': len(methods), 'num_files_indexed': len(files)}
    return make_response(jsonify(response), 201)
