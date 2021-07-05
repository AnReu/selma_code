import json
import re
from flask import jsonify
from flask import request
from flask import make_response
from flask_sqlalchemy import Model
from backend.app import app
from backend.app import db
from backend.app.models import QueryTemplate
from backend.app.search import search
from backend.parser import markdown_parser
from backend.parser import pdf_parser
from backend.parser import tex_parser


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
    return jsonify(['English', 'German'])


@app.route('/api/v1/query-templates')
def get_query_templates():
    # TODO: implement me
    # get_templates = QueryTemplate.query.get(1)
    # todo_schema = TemplateSchema(many=True)
    # template = todo_schema.dump(get_templates)
    return make_response(jsonify(['QueryTP1', 'QueryTemplate_2']))
