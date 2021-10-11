import os
import dotenv
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    # Flask and some of its extensions use the value of the secret key
    # as a cryptographic key, useful to generate signatures or tokens.
    SECRET_KEY = os.environ.get('SECRET_KEY') or '4r6ZmzajqSoSFn'

    # Flask-SQLAlchemy configuration parameters
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, '../app.db')
    # SQLALCHEMY_TRACK_MODIFICATIONS = False disables, sending a signal to
    # the application every time a change is about to be made in the database.
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DATA_DIR = ''

    @staticmethod
    def load_rsenv() -> bool:
        path = dotenv.find_dotenv(".rsenv")
        rsconfig = dotenv.load_dotenv(path, encoding="utf-8")
        return rsconfig

    @staticmethod
    def set_data_dir(app_path):
        try:
            Config.DATA_DIR = os.path.join(app_path, 'data')
        except Exception as error:
            print(f'oops... error = {error}')
