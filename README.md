# BI-Project
 
## Backend part

### Database - how to use?

PostgreSQL - you have to run all the scripts from database folder. 
First, run `database_ddl_and_dml.sql`. This will create the tables in a database you have selected
Second, run `work_around_music_db.sql`. This will create the Materialized views to be used by the endpoints.

### Server - how to run?

In order to run the Backend (which is a FastAPI server).
First, create a pyenv by running: `py -3.9 -m venv env`, then activate your env by running going to path `env\Scripts\activate`
Second, install the dependencies by running `pip install -r requirements.txt`

How to run the server itself?
`uvicorn app:app --reload`

How to see the API?
Go to: `localhost:8000/docs`



