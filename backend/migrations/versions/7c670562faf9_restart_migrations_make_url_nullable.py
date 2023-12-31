"""Restart migrations: Make url nullable

Revision ID: 7c670562faf9
Revises: 
Create Date: 2022-07-04 14:47:50.535724

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7c670562faf9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('query_template',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('database', sa.String(length=120), nullable=False),
    sa.Column('model', sa.String(length=80), nullable=False),
    sa.Column('index', sa.String(length=120), nullable=True),
    sa.Column('language', sa.String(length=120), nullable=False),
    sa.Column('mode', sa.String(length=80), nullable=False),
    sa.Column('text', sa.String(length=120), nullable=True),
    sa.Column('code', sa.String(length=120), nullable=True),
    sa.Column('equation', sa.String(length=120), nullable=True),
    sa.Column('url', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('query_template')
    # ### end Alembic commands ###
