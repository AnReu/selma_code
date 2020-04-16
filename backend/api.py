import sys
import json
from pathlib import Path

from flask import Flask, jsonify, request
from flask_cors import CORS

sys.path.insert(0, '..')
import VectorModel.predictor

app = Flask(__name__)
CORS(app)


@app.route('/search')
def search_route():
    text = request.args.get('text')
    code = request.args.get('code')
    equation = request.args.get('equations')

    data_path = str(Path().absolute().parent) + '/data/'
    documents = json.load(open(data_path + '300_physics_questions.json'))

    predictor = VectorModel.predictor.Predictor(data_path)
    results = predictor.predict(text, code, equation)

    return jsonify([documents[result] for result in results])
