import os

db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/time_boxes')
secret = os.getenv('SECRET', 'shhh')

LOG_TO_STDOUT = os.environ.get('LOG_TO_STDOUT')
