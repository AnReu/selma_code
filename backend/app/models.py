from backend.app import app_db as db
from backend.app import ma
from marshmallow import post_load


class QueryTemplate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    model_name = db.Column(db.String(80), nullable=False)
    model_language = db.Column(db.String(120), nullable=False)
    query_text = db.Column(db.String(120), nullable=False)
    user = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return '<QueryTemplate %r>' % self.name

    def from_dict(self, data):
        for field in ['model_name', 'model_language', 'name', 'query_text', 'user']:
            if field in data:
                setattr(self, field, data[field])


def camelcase(s):
    parts = iter(s.split("_"))
    return next(parts) + "".join(i.title() for i in parts)


class CamelCaseSchema (ma.SQLAlchemySchema):
    """Schema that uses camel-case for its external representation
    and snake-case for its internal representation.
    """
    def on_bind_field(self, field_name, field_obj):
        field_obj.data_key = camelcase(field_obj.data_key or field_name)


class QueryTemplateSchema(CamelCaseSchema):
    class Meta:
        # Fields to expose
        model = QueryTemplate
        include_fk = True

    id = ma.auto_field()
    name = ma.auto_field()
    query_text = ma.auto_field()
    model_name = ma.auto_field()
    model_language = ma.auto_field()
    user = ma.auto_field()
