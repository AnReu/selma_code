from backend.app import app_db as db


class QueryTemplate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    model_name = db.Column(db.String(80), nullable=False)
    model_language = db.Column(db.String(120), nullable=False)
    query_text = db.Column(db.String(120), nullable=False)
    user = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return '<QueryTemplate %r>' % self.name

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
