# import os
from flask import Flask
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from backend.config import Config
from flask_marshmallow import Marshmallow

# from .db_connection import DB

db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()


def create_app(config_class=Config):
    app = Flask(__name__, static_folder="../../frontend/build", static_url_path="/")
    CORS(app)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)

    from backend.app.errors import bp as errors_bp

    app.register_blueprint(errors_bp)

    from backend.app.main import bp as main_bp

    app.register_blueprint(main_bp)

    return app


from backend.app import models

# from backend.app import api, models # noqa
