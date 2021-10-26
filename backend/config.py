import os
from dotenv import load_dotenv, find_dotenv

basedir = find_dotenv("app/.rsenv")
load_dotenv(basedir, encoding="utf-8")


class Config(object):
    # Flask and some of its extensions use the value of the secret key
    # as a cryptographic key, useful to generate signatures or tokens.
    SECRET_KEY = os.environ.get('SECRET_KEY') or '4r6ZmzajqSoSFn'

    # Flask-SQLAlchemy configuration parameters
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    # SQLALCHEMY_TRACK_MODIFICATIONS = False disables, sending a signal to
    # the application every time a change is about to be made in the database.
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    __DATA_DIR = None
    __DB_PATH = None
    __PYTERRIER_MODEL_PATH = None
    __DB_TABLE_NAME = None
    __DB_CONTENT_ATTRIBUTE_NAME = None

    @staticmethod
    def get_db_path():
        if Config.__DB_PATH:
            return Config.__DB_PATH
        try:
            return os.environ.get('DB_PATH')
        except Exception as error:
            print(f'Could not find DB_PATH. Variable was not set in frontend nor using .rsenv')
            raise

    @staticmethod
    def get_data_dir():
        if Config.__DATA_DIR:
            return Config.__DATA_DIR
        try:
            return os.environ.get('DATA_DIR')
        except Exception as error:
            print(f'Could not find DATA_DIR. Variable was not set in frontend nor using .rsenv')
            raise

    @staticmethod
    def get_data_pyterrier_model_path():
        if Config.__PYTERRIER_MODEL_PATH:
            return Config.__PYTERRIER_MODEL_PATH
        try:
            return os.environ.get('PYTERRIER_MODEL_PATH')
        except Exception as error:
            print(f'Could not find PYTERRIER_MODEL_PATH. Variable was not set in frondend nor using .rsenv')
            raise




