import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from pathlib import Path
from .config import Config
from .db_connection import DB
from .search import search


app = Flask(__name__, static_folder='../../frontend/build', static_url_path='/')
app.config.from_object(Config)
# app_db is the DB used by the frontend app. It stores things like QueryTemplates.
app_db = SQLAlchemy(app)
migrate = Migrate(app, app_db)

PROJECT_DIR = str(Path(__file__).parents[2]) + '/'
# DATA_PATH = PROJECT_DIR + os.environ.get('DATA_DIR')
# db is the DB used by information retrieval models, such as tf-idf, boolean and so on.
db = DB(PROJECT_DIR + os.environ.get('DB_PATH'))

from backend.app import api, models
