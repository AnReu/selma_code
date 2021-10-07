import datetime
import json
import re
import os
from flask import jsonify, request, make_response
from backend.app import app, DATA_DIR
from backend.app import db
from backend.app import app_db
from backend.app.models import QueryTemplate, QueryTemplateSchema
from backend.app.search import search
from backend.parser import markdown_parser
from backend.parser import pdf_parser
from backend.parser import tex_parser
from marshmallow import ValidationError


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/v1/search')
def search_route():
    text = request.args.get('text')
    code = request.args.get('code')
    equation = request.args.get('equations')
    id = request.args.get('id')
    exchange = request.args.get('exchange') or 'physics,stackexchange'
    exchange = exchange.split(',')
    model = request.args.get('model')
    model_language = request.args.get('model-language')
    return search(db, text, code, equation, id, exchange, model)


@app.route('/api/v1/relevance', methods=['POST'])
def relevance():
    data = json.loads(request.data)

    con, cur = db.create_connection()
    cur.execute('INSERT INTO relevances (id, query, relevant) VALUES (?, ?, ?)',
                (data['result_id'], json.dumps(data['query']), data['value']))
    con.commit()
    con.close()

    return '', 204


@app.route('/api/v1/document')
def get_document():
    id = request.args.get('id')
    document = db.get_results_by_id('searchables', [id], ['text'])[0][0]
    return {'document': re.subn(r'<img', '<img style="max-width: 100%"', document)[0]}


def allowed_file(filename):
    allowed_extensions = {'pdf', 'tex', 'md'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions


@app.route('/api/v1/file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file present', 400
    file = request.files['file']
    if file.filename == '':
        return 'No filename present', 400
    if file and allowed_file(file.filename):
        model_language = request.form.get('model-language')
        if file.filename.endswith('.pdf'):
            return search(db, text=pdf_parser.get_abstract(file))
        if file.filename.endswith('.tex'):
            text, equations = tex_parser.search(file)
            return search(db, text=text, equation=max(equations, key=len, default=''))
        if file.filename.endswith('.md'):
            text, code, equations = markdown_parser.search(file)
            return search(db, text=text, code=code, equation=max(equations, key=len, default=''))
    else:
        return 'Only PDFs are allowed file types', 403


@app.route('/api/v1/models')
def get_names_of_models():
    import backend.models
    return jsonify(backend.models.__all__)


@app.route('/api/v1/languages')
def get_languages():
    return jsonify(['english', 'german'])


@app.route('/api/v1/dbs')
def get_dbs():
    dbs = []
    for file in os.listdir(DATA_DIR):
        if file.endswith(".db"):
            dbs.append(file)
    return jsonify(dbs)


@app.route('/api/v1/query-templates')
def get_all_query_templates():
    all_templates = QueryTemplate.query.all()
    schema = QueryTemplateSchema(many=True)
    results = schema.dump(all_templates)
    print(results)
    return jsonify(results)


@app.route('/api/v1/query-templates/<id>', methods=['DELETE'])
def delete_query_template_by_id(id):
    get_query_template = QueryTemplate.query.get(id)
    app_db.session.delete(get_query_template)
    app_db.session.commit()
    # TODO fix code below
    return make_response(f'woooooooow {id}', 204)


@app.route('/api/v1/query-templates', methods=['POST'])
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
    app_db.session.add(query_template)
    app_db.session.commit()
    result = schema.dump(QueryTemplate.query.get(query_template.id))
    return {"message": "Created new Query Template.", "queryTemplate": result}



