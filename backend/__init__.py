import os
from pathlib import Path
from flask import Flask
from backend.db_connection import DB
from backend.search import search


app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

PROJECT_DIR = str(Path(__file__).parents[1]) + '/'
data_path = PROJECT_DIR + os.environ.get('DATA_DIR')
db = DB(PROJECT_DIR + os.environ.get('DB_PATH'))
