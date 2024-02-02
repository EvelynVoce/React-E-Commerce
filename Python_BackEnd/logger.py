import json
import logging
import uuid
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.background import BackgroundTask
from Controllers import ProductsController, UsersController, CartController, LikedItemsController
import uvicorn


def setup_logger(name, log_file, level=logging.INFO):
    handler = logging.FileHandler(log_file)
    handler.setFormatter(formatter)
    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(handler)
    return logger


def log_info(req_body, res_body):
    api_logger.info(req_body)
    api_logger.info(res_body)


class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        correlation_id = uuid.uuid4()
        request_body = json.dumps({"CorrelationId": f"{correlation_id}", "request": {"method": request.method, "url": f"{request.url}"}})

        response = await call_next(request)

        payload_bytes = b''
        async for chunk in response.body_iterator:
            payload_bytes += chunk
        payload = payload_bytes.decode("utf-8")

        response_body = {
            "CorrelationId": f"{correlation_id}",
            "response": {
                "status code": f"{response.status_code}",
                "payload":  payload
            }
        }

        response_body_json = json.dumps(response_body)
        response_body_unescaped = response_body_json.replace('"[', '[').replace(']"', ']').replace('\\"', '"').replace('""', '"')

        logging_task = BackgroundTask(log_info, request_body, response_body_unescaped)
        return Response(content=payload_bytes, status_code=response.status_code,
                        headers=dict(response.headers), media_type=response.media_type, background=logging_task)


formatter = logging.Formatter('{"LogDateTime": "%(asctime)s","Level": "%(levelname)s", "message": %(message)s}')
api_logger = setup_logger('api_logger', 'api.log')
api_error_logger = setup_logger('api-error_logger', 'api-error.log')
