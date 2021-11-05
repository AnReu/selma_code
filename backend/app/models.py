from backend.app import db
from backend.app import ma


class QueryTemplate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    model = db.Column(db.String(80), nullable=False)
    mode = db.Column(db.String(80), nullable=False)
    language = db.Column(db.String(120), nullable=False)
    text = db.Column(db.String(120), nullable=True)
    code = db.Column(db.String(120), nullable=True)
    equation = db.Column(db.String(120), nullable=True)
    user = db.Column(db.String(120), nullable=False)
    url = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return "<QueryTemplate %r>" % self.name

    def from_dict(self, data):
        for field in [
            "model",
            "language",
            "name",
            "text",
            "user",
            "code",
            "equation",
            "mode",
            "url",
        ]:
            if field in data:
                setattr(self, field, data[field])


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
    code = ma.auto_field()
    equation = ma.auto_field()
    user = ma.auto_field()
    url = ma.auto_field()
