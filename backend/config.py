import os
import dotenv
basedir = os.path.abspath(os.path.dirname(__file__))


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
    def load_rsenv() -> bool:
        path = dotenv.find_dotenv("app/.rsenv")
        rsconfig = dotenv.load_dotenv(path, encoding="utf-8")
        return rsconfig

    @staticmethod
    def set_data_dir(app_path):
        try:
            Config.DATA_DIR = os.path.join(app_path, 'data')
        except Exception as error:
            print(f'oops... error = {error}')

    @staticmethod
    def get_db_path(self):
        if self.__DB_PATH:
            return self.__DB_PATH
        try:
            return os.environ.get('DB_PATH')
        except Exception as error:
            print(f'Could not find DB_PATH. Variable was not set in frondend nor using .rsenv')
            raise




