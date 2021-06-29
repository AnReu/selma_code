import os
from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
from pathlib import Path
from .config import Config
from .db_connection import DB
from .search import search


app = Flask(__name__, static_folder='../../frontend/build', static_url_path='/')
app.config.from_object(Config)

PROJECT_DIR = str(Path(__file__).parents[1]) + '/'
# DATA_PATH = PROJECT_DIR + os.environ.get('DATA_DIR')
db = DB(PROJECT_DIR + os.environ.get('DB_PATH'))

# app_db = SQLAlchemy(app)
# migrate = Migrate(app, app_db)

from backend.app import api
