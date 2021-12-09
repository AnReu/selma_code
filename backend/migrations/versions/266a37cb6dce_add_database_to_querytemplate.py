"""add 'database' to QueryTemplate

Revision ID: 266a37cb6dce
Revises: 2999116f51e0
Create Date: 2021-11-05 10:38:39.481704

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "266a37cb6dce"
down_revision = "2999116f51e0"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "query_template", sa.Column("database", sa.String(length=120), nullable=False)
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("query_template", "database")
    # ### end Alembic commands ###
