from flask import Blueprint, jsonify, request
from models.time_box import TimeBox, TimeBoxSchema
from marshmallow import ValidationError
from app import db, ma
from lib.secure_route import secure_route

api = Blueprint('time_boxes', __name__)
time_box_schema = TimeBoxSchema()

@api.route('/time-box', methods=['POST'])
@secure_route
def create():
    json_input = request.get_json()
    try:
        time_box = time_box_schema.load(json_input)
        errors = None
    except ValidationError as err:
        errors = err.messages
        valid_data = err.valid_data
    if errors:
        return jsonify(errors), 422  
    new_time_box = TimeBox()

    new_time_box.save()
    db.session.add(new_time_box)
    db.session.commit()
    return jsonify({'id': str(new_time_box.id)}), 201