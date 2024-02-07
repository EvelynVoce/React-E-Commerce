import pyodbc
import os
import json
from logging_tools.logging_setup import setup_logger

api_error_logger = setup_logger('api-error_logger', 'api-error.log', '{"LogDateTime": "%(asctime)s","Level": "%(levelname)s", "FileName": "%(filename)s", "Function": "%(funcName)s", "LineNumber": "%(lineno)s", "Message": %(message)s}')


def get_db_connection():
    try:
        return pyodbc.connect(os.environ['CONNECTION_STRING'])
    except pyodbc.InterfaceError as e:
        api_error_logger.error(json.dumps(str(e)))
