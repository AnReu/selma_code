import os
import json
from pathlib import Path
import re

from flask import Flask, request
from werkzeug.utils import secure_filename

import db_connection
import search

ALLOWED_EXTENSIONS = {'pdf'}

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

PROJECT_DIR = str(Path(__file__).parents[1]) + '/'
data_path = PROJECT_DIR + os.environ.get('DATA_DIR')
db = db_connection.DB(PROJECT_DIR + os.environ.get('DB_PATH'))
app.config['UPLOAD_FOLDER'] = PROJECT_DIR + os.environ.get('UPLOAD_FOLDER')


@app.route('/api/v1/search')
def search_route():
    return search.search(request, db)


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
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return '', 200
    else:
        return 'Only PDFs are allowed file types', 403
