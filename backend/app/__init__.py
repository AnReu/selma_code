import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from .config import Config
from .db_connection import DB

# Load environment variables specific to the retrievalsystem app.
Config.load_rsenv()

app = Flask(__name__, static_folder='../../frontend/build', static_url_path='/')
Config.set_data_dir(os.path.dirname(app.instance_path))

app.config.from_object(Config)
# app_db is the DB used by the frontend app. It stores things like QueryTemplates.
app_db = SQLAlchemy(app)
migrate = Migrate(app, app_db)
ma = Marshmallow(app)

# The var db is the DB used by information retrieval models, such as tf-idf, boolean and so on.
db = DB(os.environ.get('DB_PATH'))

from backend.app import api, models # noqa
