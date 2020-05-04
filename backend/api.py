import os
import sys
import json
from pathlib import Path
import re

from flask import Flask, jsonify, request
from flask_cors import CORS

import db_connection
from HTMLCutter import HTMLCutter
sys.path.insert(0, os.path.abspath('.'))
import VectorModel.predictor

app = Flask(__name__)
CORS(app)

data_path = str(Path().absolute()) + '/data/'
db = db_connection.DB(data_path + 'db.db')
cutter = HTMLCutter(700, 2000)


@app.route('/search')
def search_route():
    text = request.args.get('text')
    code = request.args.get('code')
    equation = request.args.get('equations')

    predictor = VectorModel.predictor.Predictor(data_path)
    result_ids = predictor.predict(text, code, equation)

    result_ids = [result_id + 1 for result_id in result_ids]

    data = db.get_results_by_id('searchables', result_ids)
    column_names = db.get_column_names('searchables')

    results = results_to_json(data, [description[0] for description in column_names])

    for result in results:
        result['text'], result['cut'] = trim_html(result['text'])

    return jsonify(results)


@app.route('/relevance', methods=['POST'])
def relevance():
    data = json.loads(request.data)

    con, cur = db.create_connection()
    cur.execute('INSERT INTO relevances (id, query, relevant) VALUES (?, ?, ?)',
                (data['result_id'], json.dumps(data['query']), data['value']))
    con.commit()
    con.close()

    return '', 204


@app.route('/document')
def get_document():
    id = request.args.get('id')
    document = db.get_results_by_id('searchables', [id], ['text'])[0][0]
    return jsonify(re.subn(r'<img', '<img style="max-width: 100%"', document)[0])


def results_to_json(results, column_names):
    return_value = []
    for result in results:
        element = {}
        for title in column_names:
            element[title] = result[column_names.index(title)]
        return_value.append(element)
    return return_value


def trim_html(html):
    return cutter.cut(re.subn(r'<img[^>]*>', '', html)[0])
