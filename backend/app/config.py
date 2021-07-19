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
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def load_rsenv() -> bool:
        path = dotenv.find_dotenv(".rsenv")
        rsconfig = dotenv.load_dotenv(path, encoding="utf-8")
        return rsconfig
