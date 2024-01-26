import pyodbc
import os


def get_db_connection():
    return pyodbc.connect(os.environ['CONNECTION_STRING'])
