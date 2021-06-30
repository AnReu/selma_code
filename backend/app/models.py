from backend.app import app_db as db


class QueryTemplate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    model_name = db.Column(db.String(80), unique=True, nullable=False)
    model_language = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.name
