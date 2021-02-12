from flask import Blueprint, jsonify, request, g
from models.user import User, UserSchema
from lib.secure_route import secure_route
from marshmallow import ValidationError
from sqlalchemy import engine 
from sqlalchemy.orm import scoped_session, sessionmaker
from app import db



api = Blueprint('users', __name__)
user_schema = UserSchema()

@api.route('/register', methods=['POST'])
def register():
    json_input = request.get_json()
    try:
        user = user_schema.load(json_input)
        errors = None
    except ValidationError as err:
        errors = err.messages
        valid_data = err.valid_data
    if errors:
        return jsonify(errors), 422  
    new_user = User(username=json_input['username'],email=json_input['email'], password=json_input['password'])
    new_user.save()
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Registration Successful'}), 201