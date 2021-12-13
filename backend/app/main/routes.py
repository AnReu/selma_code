import json
import re
import os
from flask import jsonify, request, make_response, current_app
from backend.app import db
from backend.app.models import QueryTemplate, QueryTemplateSchema
from backend.app.search import search
from backend.parser import markdown_parser
from backend.parser import pdf_parser
from backend.parser import tex_parser
from marshmallow import ValidationError
from backend.app.db_connection import DB
from backend.config import Config
from backend.app.main import bp


@bp.route("/")
def index():
    return current_app.send_static_file("index.html")


@bp.route("/api/v1/search")
def search_route():
    text = request.args.get("text")
    code = request.args.get("code")
    equation = request.args.get("equations")
    _id = request.args.get("id")
    exchange = request.args.get("exchange") or "physics,stackexchange"
    exchange = exchange.split(",")
    model = request.args.get("model")
    model_language = request.args.get("model-language")
    db_name = request.args.get("db")
    if db_name:
        db_path = os.path.join(Config.get_data_dir(), db_name)
    else:
        db_path = Config.get_db_path()
    _db = DB(db_path)

    return search(_db, text, code, equation, _id, exchange, model, model_language)


@bp.route("/api/v1/relevance", methods=["POST"])
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


@bp.route("/api/v1/document")
def get_document():
    id = request.args.get("id")
    document = db.get_results_by_id("Documents", [id], ["text"])[0][0]
    return {"document": re.subn(r"<img", '<img style="max-width: 100%"', document)[0]}


def allowed_file(filename):
    allowed_extensions = {"pdf", "tex", "md"}
    return "." in filename and filename.rsplit(".", 1)[1].lower() in allowed_extensions


@bp.route("/api/v1/file", methods=["POST"])
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


@bp.route("/api/v1/models")
def get_names_of_models():
    import backend.models

    return jsonify(backend.models.__all__)


@bp.route("/api/v1/languages")
def get_languages():
    return jsonify(["english", "german"])


@bp.route("/api/v1/dbs")
def get_dbs():
    dbs = []
    for file in os.listdir(Config.get_data_dir()):
        if file.endswith(".db"):
            dbs.append(file)
    return jsonify(dbs)


@bp.route("/api/v1/query-templates")
def get_all_query_templates():
    all_templates = QueryTemplate.query.all()
    schema = QueryTemplateSchema(many=True)
    results = schema.dump(all_templates)
    return jsonify(results)


@bp.route("/api/v1/query-templates/<id>", methods=["DELETE"])
def delete_query_template_by_id(id):
    query_template = QueryTemplate.query.get(id)
    db.session.delete(query_template)
    db.session.commit()
    return jsonify(query_template.as_dict())


@bp.route("/api/v1/query-templates", methods=["POST"])
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


@bp.route("/api/v1/configs", methods=["GET"])
def get_config_vars():
    default_allowed_search_modes = {
        "default": True,
        "separated": True,
        "url": True,
        "file": True,
    }
    config_vars = {
        "data_dir": Config.DATA_DIR if Config.DATA_DIR else "",
        "db_path": Config.DB_PATH if Config.DB_PATH else "",
        "db_table_name": Config.DB_TABLE_NAME if Config.DB_TABLE_NAME else "",
        "db_content_attribute_name": Config.DB_CONTENT_ATTRIBUTE_NAME
        if Config.DB_CONTENT_ATTRIBUTE_NAME
        else "",
        "pyterrier_model_path": Config.PYTERRIER_MODEL_PATH
        if Config.PYTERRIER_MODEL_PATH
        else "",
        "allowed_search_modes": Config.ALLOWED_SEARCH_MODES
        if Config.ALLOWED_SEARCH_MODES
        else default_allowed_search_modes,
    }
    return make_response(jsonify(config_vars), 200)


@bp.route("/api/v1/configs", methods=["POST"])
def update_config_vars():
    json_data = request.get_json()
    modified_fields = []
    if "data_dir" in json_data:
        Config.DATA_DIR = json_data["data_dir"]
        modified_fields.append("data_dir")
    else:
        Config.DATA_DIR = None

    if "db_path" in json_data:
        Config.DB_PATH = json_data["db_path"]
        modified_fields.append("db_path")
    else:
        Config.DB_PATH = None

    if "db_table_name" in json_data:
        Config.DB_TABLE_NAME = json_data["db_table_name"]
        modified_fields.append("db_table_name")
    else:
        Config.DB_TABLE_NAME = None

    if "db_content_attribute_name" in json_data:
        Config.DB_CONTENT_ATTRIBUTE_NAME = json_data["db_content_attribute_name"]
        modified_fields.append("db_content_attribute_name")
    else:
        Config.DB_CONTENT_ATTRIBUTE_NAME = None

    if "allowed_search_modes" in json_data:
        Config.ALLOWED_SEARCH_MODES = json_data["allowed_search_modes"]
        modified_fields.append("allowed_search_modes")
    else:
        Config.ALLOWED_SEARCH_MODES = {
            "default": True,
            "separated": True,
            "url": True,
            "file": True,
        }

    return make_response(jsonify(modified_fields), 204)
