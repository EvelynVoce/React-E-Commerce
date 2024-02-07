from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.background import BackgroundTask
from logging_tools.logging_setup import setup_logger
import json
import uuid


class LoggingMiddleware(BaseHTTPMiddleware):

    api_logger = setup_logger('api_logger', 'api.log')

    async def dispatch(self, request: Request, call_next):
        correlation_id = uuid.uuid4()
        request_body = json.dumps({
            "CorrelationId": f"{correlation_id}",
            "Request": {
                "Method": request.method,
                "Url": f"{request.url}"
            }
        })

        response = await call_next(request)
        payload_bytes = await self.stream_response(response)
        response_payload: str = payload_bytes.decode("utf-8")

        response_body_json = json.dumps({
            "CorrelationId": f"{correlation_id}",
            "Response": {
                "Status code": f"{response.status_code}",
                "Payload":  response_payload
            }
        })
        response_body_unescaped = response_body_json.replace('"[', '[').replace(']"', ']').replace('\\"', '"').replace('""', '"')

        logging_task = BackgroundTask(self.log_info, request_body, response_body_unescaped)
        return Response(content=payload_bytes, status_code=response.status_code,
                        headers=dict(response.headers), media_type=response.media_type, background=logging_task)

    @staticmethod
    async def stream_response(response: Response):
        payload_bytes = b''
        async for chunk in response.body_iterator:
            payload_bytes += chunk
        return payload_bytes

    def log_info(self, req_body, res_body):
        self.api_logger.info(req_body)
        self.api_logger.info(res_body)
