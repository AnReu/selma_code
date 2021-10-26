# import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from backend.config import Config
from flask_marshmallow import Marshmallow
# from .db_connection import DB

db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()


def create_app(config_class=Config):
    # # Load environment variables specific to the retrievalsystem app.
    # Config.load_rsenv()

    app = Flask(__name__)
    # app = Flask(__name__, static_folder='../../frontend/build', static_url_path='/')
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)


    from backend.app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    from backend.app.main import bp as main_bp
    app.register_blueprint(main_bp)

    # # The var db is the DB used by information retrieval models, such as tf-idf, boolean and so on.
    # db = DB(os.environ.get('DB_PATH'))
    # Config.set_data_dir(os.path.dirname(app.instance_path))

    return app


from backend.app import models
# from backend.app import api, models # noqa
