import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, "app", ".rsenv"), encoding="utf-8")


class Config(object):
    # Flask and some of its extensions use the value of the secret key
    # as a cryptographic key, useful to generate signatures or tokens.
    SECRET_KEY = os.environ.get("SECRET_KEY") or "4r6ZmzajqSoSFn"

    # Flask-SQLAlchemy configuration parameters
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL"
    ) or "sqlite:///" + os.path.join(basedir, "app.db")
    # SQLALCHEMY_TRACK_MODIFICATIONS = False disables, sending a signal to
    # the application every time a change is about to be made in the database.
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    DB_PATH = None  # TODO rename var
    INDEX_PATH = None
    DB_TABLE_NAME = None
    DB_CONTENT_ATTRIBUTE_NAME = None  # TODO rename
    ALLOWED_SEARCH_MODES = None
    DATA_PATH = None

    @staticmethod
    def to_dict():
        return {
            "db_path": Config.DB_PATH,
            "index_path": Config.INDEX_PATH,
            "db_table_name": Config.DB_TABLE_NAME,
            "db_content_attribute_name": Config.DB_CONTENT_ATTRIBUTE_NAME,
            "data_path": Config.DATA_PATH,
            "allowed_search_modes": {
                "default": Config.ALLOWED_SEARCH_MODES["default"],
                "separated": Config.ALLOWED_SEARCH_MODES["separated"],
                "url": Config.ALLOWED_SEARCH_MODES["url"],
                "file": Config.ALLOWED_SEARCH_MODES["file"],
            },
        }

    @staticmethod
    def get_data_path():
        if os.environ.get("DATA_PATH"):
            return os.environ.get("DATA_PATH")

        raise Exception("DATA_PATH is not defined in .rsenv file")

    @staticmethod
    def get_db_path(db_name):  # TODO rename method
        if Config.DB_PATH:
            return Config.DB_PATH

        return os.path.join(Config.get_data_path(), db_name, f"{db_name}.db")

    @staticmethod
    def get_db_content_attribute_name():
        if Config.DB_CONTENT_ATTRIBUTE_NAME:
            return Config.DB_CONTENT_ATTRIBUTE_NAME

        custom_db_content_attribute_name = os.environ.get("DB_CONTENT_ATTRIBUTE_NAME")
        if custom_db_content_attribute_name is not None:
            return os.environ.get("DB_CONTENT_ATTRIBUTE_NAME")
        else:
            raise Exception("DB_CONTENT_ATTRIBUTE_NAME is not defined in .rsenv file")

    @staticmethod
    def get_db_table_name():
        if Config.DB_TABLE_NAME:
            return Config.DB_TABLE_NAME

        custom_db_table_name = os.environ.get("DB_TABLE_NAME")
        if custom_db_table_name is not None:
            return os.environ.get("DB_TABLE_NAME")
        else:
            raise Exception("DB_TABLE_NAME is not defined in .rsenv file")

    @staticmethod
    def get_allowed_search_modes():
        if Config.ALLOWED_SEARCH_MODES:
            return Config.ALLOWED_SEARCH_MODES

        custom_allowed_search_modes = os.environ.get("ALLOWED_SEARCH_MODES")
        if custom_allowed_search_modes is not None:
            return os.environ.get("ALLOWED_SEARCH_MODES")

        return True

    @staticmethod
    def get_index_path(db, model, index):
        if Config.INDEX_PATH:
            return Config.INDEX_PATH

        return os.path.join(Config.get_data_path(), db, model, index)
