from backend import app_db


class QueryTemplate(app_db.Model):
    id = app_db.Column(app_db.Integer, primary_key=True)
    name = app_db.Column(app_db.String(80), unique=True, nullable=False)
    model_name = app_db.Column(app_db.String(80), unique=True, nullable=False)
    model_language = app_db.Column(app_db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.name
