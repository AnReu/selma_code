import rq
import redis
from flask import current_app
from backend.app import db
from backend.app import ma


class QueryTemplate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    database = db.Column(db.String(120), nullable=False)
    model = db.Column(db.String(80), nullable=False)
    index = db.Column(db.String(120), nullable=True)
    language = db.Column(db.String(120), nullable=False)
    mode = db.Column(db.String(80), nullable=False)

    text = db.Column(db.String(120), nullable=True)
    code = db.Column(db.String(120), nullable=True)
    equation = db.Column(db.String(120), nullable=True)
    url = db.Column(db.String(120), nullable=True)

    def __repr__(self):
        return "<QueryTemplate %r>" % self.name

    def from_dict(self, data):
        for field in [
            "model",
            "language",
            "name",
            "text",
            "index",
            "code",
            "equation",
            "mode",
            "url",
            "database",
        ]:
            if field in data:
                setattr(self, field, data[field])

    def as_dict(self):
        return {
            "model": self.model,
            "language": self.language,
            "name": self.name,
            "text": self.text,
            "index": self.index,
            "code": self.code,
            "equation": self.equation,
            "mode": self.mode,
            "url": self.url,
            "database": self.database,
        }


def camelcase(s):
    parts = iter(s.split("_"))
    return next(parts) + "".join(i.title() for i in parts)


class CamelCaseSchema(ma.SQLAlchemySchema):
    """Schema that uses camel-case for its external representation
    and snake-case for its internal representation.
    """

    @staticmethod
    def on_bind_field(field_name, field_obj):
        field_obj.data_key = camelcase(field_obj.data_key or field_name)


class QueryTemplateSchema(CamelCaseSchema):
    class Meta:
        # Fields to expose
        model = QueryTemplate
        include_fk = True

    id = ma.auto_field()
    name = ma.auto_field()
    mode = ma.auto_field()
    model = ma.auto_field()
    language = ma.auto_field()
    text = ma.auto_field()
    index = ma.auto_field()
    code = ma.auto_field()
    equation = ma.auto_field()
    url = ma.auto_field()
    database = ma.auto_field()


class Task(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(128), index=True)
    description = db.Column(db.String(128))
    complete = db.Column(db.Boolean, default=False)

    def get_rq_job(self):
        try:
            rq_job = rq.job.Job.fetch(self.id, connection=current_app.redis)
        except (redis.exceptions.RedisError, rq.exceptions.NoSuchJobError):
            return None
        return rq_job

    def get_progress(self):
        job = self.get_rq_job()
        return job.meta.get("progress", 0) if job is not None else 100
