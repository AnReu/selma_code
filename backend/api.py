import os
import json
from pathlib import Path
import re

from flask import Flask, request

import db_connection
import pdf_parser
import search
import tex_parser

ALLOWED_EXTENSIONS = {'pdf', 'tex'}

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

PROJECT_DIR = str(Path(__file__).parents[1]) + '/'
data_path = PROJECT_DIR + os.environ.get('DATA_DIR')
db = db_connection.DB(PROJECT_DIR + os.environ.get('DB_PATH'))


@app.route('/api/v1/search')
def search_route():
    text = request.args.get('text')
    code = request.args.get('code')
    equation = request.args.get('equations')
    id = request.args.get('id')
    exchange = request.args.get('exchange') or 'physics,stackexchange'
    exchange = exchange.split(',')
    model_language = request.args.get('model-language')
    return search.search(db, text, code, equation, id, exchange)


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
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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
            return search.search(db, text=pdf_parser.get_abstract(file))
        if file.filename.endswith('.tex'):
            text, equations = tex_parser.search(file)
            return search.search(db, text=text, equation=max(equations, key=len, default=''))
    else:
        return 'Only PDFs are allowed file types', 403
