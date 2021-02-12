from marshmallow import fields
from app import db, bcrypt

from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from .base import BaseModel, BaseSchema

class User(db.Model,BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password=db.Column(db.String(128), nullable=False, unique=True)

class UserSchema(SQLAlchemyAutoSchema,BaseSchema):


    class Meta:
        model = User
        fields = ('username','email', 'password')
        sqla_session = db.session
