import sys

from flask import Flask, jsonify, request
from flask_cors import CORS

sys.path.insert(1, '../core')

import search
import vec

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/search')
def search_route():
    text = request.args.get('text')
    code = request.args.get('code')
    equations = request.args.get('equations')

    return jsonify(search.search(vec.get(text, code, equations)))
