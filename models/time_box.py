from marshmallow import fields
from app import db, ma
from .base import BaseModel, BaseSchema
from flask_marshmallow import Marshmallow
from .time_box import BaseModel, BaseSchema
from .user import User, UserSchema
from sqlalchemy import types

ma = Marshmallow()

class TimeBox(db.Model, BaseModel):
    __tablename__ = 'time_boxes'
    user = db.relationship('User', backref='created_time_boxes')
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    active = db.Column(db.Boolean, default=True)

class TimeBoxSchema(ma.SQLAlchemySchema, BaseSchema):
    created_time_boxes = fields.Nested('TimeBoxSchema', many=True)

    class Meta:
        model = TimeBox
        fields = ('active',)
        sqla_session = db.session

    user = fields.Nested('UserSchema')