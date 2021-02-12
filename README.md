# Pento tech challenge

Thanks for taking the time to do our tech challenge. 

The challenge is to build a small full stack web app, that can help a freelancer track their time.

It should satisfy these user stories:

- As a user, I want to be able to start a time tracking session
- As a user, I want to be able to stop a time tracking session
- As a user, I want to be able to name my time tracking session
- As a user, I want to be able to save my time tracking session when I am done with it
- As a user, I want an overview of my sessions for the day, week and month
- As a user, I want to be able to close my browser and shut down my computer and still have my sessions visible to me when I power it up again.

## Getting started

You can fork this repo and use the fork as a basis for your project. We don't have any requirements on what stack you use to solve the task, so there is nothing set up beforehand.

## Timing

- Don't spend more than a days work on this challenge. We're not looking for perfection, rather try to show us something special and have reasons for your decisions.
- Get back to us when you have a timeline for when you are done.

## Notes

 - This is technically possible to implement only on the frontend, but please take the opportunity to show your skills on the entire stack 
 - Please focus more on code quality, building a robust service and such, than on the UI.


 Steps/Plan:

 Python/Flask/SQLAlchemy Backend 
 React/ TypeScript Front-End 

 Back-End

 Pre-requisites - PostgresQL/Python3/pipenv

 Set-up Flask, Install Dependencies - flask, flask-sqlalchemy, psycopg2-binary, flask_marshmallow

 1. App.py and basic Flask app


 First Block - trying to seed db with just one basic user. 
 
 ``` 
 Traceback (most recent call last):
  File "/Users/lily/.pyenv/versions/3.9.1/lib/python3.9/site-packages/sqlalchemy/orm/session.py", line 2016, in add
    state = attributes.instance_state(instance)
AttributeError: 'dict' object has no attribute '_sa_instance_state'

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "/Users/lily/Challenges/tech-challenge-time/seeds.py", line 16, in <module>
    db.session.add(lily)
  File "/Users/lily/.pyenv/versions/3.9.1/lib/python3.9/site-packages/sqlalchemy/orm/scoping.py", line 163, in do
    return getattr(self.registry(), name)(*args, **kwargs)
  File "/Users/lily/.pyenv/versions/3.9.1/lib/python3.9/site-packages/sqlalchemy/orm/session.py", line 2018, in add
    util.raise_(
  File "/Users/lily/.pyenv/versions/3.9.1/lib/python3.9/site-packages/sqlalchemy/util/compat.py", line 182, in raise_
    raise exception
sqlalchemy.orm.exc.UnmappedInstanceError: Class 'builtins.dict' is not mapped
```

Above solved with save, caused by breaking changes in Flask SQLAlchemy since last I used it.

Install flask-bcrypt, pyjwt for Auth


Block on /api/register 

```
    cursor.execute(statement, parameters)
sqlalchemy.exc.ProgrammingError: (psycopg2.errors.UndefinedColumn) column "password_hash" of relation "users" does not exist
LINE 1: ...O users (created_at, updated_at, username, email, password_h...
                                                             ^
```

