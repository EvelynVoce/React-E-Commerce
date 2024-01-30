import json
import logging
import uuid
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from starlette.background import BackgroundTask
from Controllers import ProductsController, UsersController, CartController, LikedItemsController
import uvicorn

# Setup logging
logger = logging.getLogger("api_logger")
logger.setLevel(logging.INFO)

# Create a file handler and set the formatter

logging.basicConfig(filename="api.log", level=logging.INFO,
                    format='{"LogDateTime": "%(asctime)s","Level": "%(levelname)s", "message": %(message)s}',
                    datefmt='%d-%m-%y %H:%M:%S')

app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def log_info(req_body, res_body):
    logging.info(req_body)
    logging.info(res_body)


@app.middleware('http')
async def log_data(request: Request, call_next):
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
    response_body_unescaped = response_body_json.replace('"[', '[').replace(']"', ']').replace('\\"', '"')

    logging_task = BackgroundTask(log_info, request_body, response_body_unescaped)
    return Response(content=payload_bytes, status_code=response.status_code,
                    headers=dict(response.headers), media_type=response.media_type, background=logging_task)


app.include_router(ProductsController.router, tags=["Products"])
app.include_router(UsersController.router, tags=["Users"])
app.include_router(CartController.router, tags=["Cart"])
app.include_router(LikedItemsController.router, tags=["LikedItems"])


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
