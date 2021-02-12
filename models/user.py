from datetime import datetime, timedelta
import jwt
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import validates_schema, ValidationError, fields
from app import db, bcrypt, ma
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from config.environment import secret
from .base import BaseModel, BaseSchema

class User(db.Model,BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=True)
    # created_time_boxes = fields.Nested('TimeBoxSchema', many=True)
    
    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, plaintext):
        self.password_hash = bcrypt.generate_password_hash(plaintext).decode('utf-8')

    def validate_password(self, plaintext):
        return bcrypt.check_password_hash(self.password_hash, plaintext)

    def generate_token(self):
        payload = {
            'exp': datetime.utcnow() + timedelta(days=1),
            'iat': datetime.utcnow(),
            'sub': self.id
        }

        token = jwt.encode(
            payload,
            secret,
            'HS256'
        )

        return token

class UserSchema(SQLAlchemyAutoSchema,BaseSchema):

    @validates_schema
    # pylint: disable=R0201
    def check_passwords_match(self, data, **kwargs):
        if data.get('password') != data.get('password_confirmation'):
            raise ValidationError(
                'Passwords do not match',
                'password_confirmation'
            )

    password = fields.String(required=True)
    password_confirmation = fields.String(required=True)

    class Meta:
        model = User
        fields = ('username','email', 'password','password_confirmation', 'password_hash')
        exclude = ('password_hash',)
        sqla_session = db.session
