import os 
from dotenv import load_dotenv
import psycopg2 as postgres


load_dotenv()

database_name = os.environ.get('database')
user = os.environ.get('user')
host = os.environ.get('host')
pw = os.environ.get('password')
port = os.environ.get('port')


postgres_conn = postgres.connect(database = database_name,\
                                 host= host, \
                                 user= user, \
                                 password = pw, \
                                 port= port) 



