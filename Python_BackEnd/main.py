import json
import logging
import uuid
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from Controllers import ProductsController, UsersController, CartController
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




@app.middleware("http")
async def log_requests(request: Request, call_next):
    correlation_id = uuid.uuid4()
    logger.info(json.dumps({"CorrelationId": f"{correlation_id}",
                            "request": {"method": f"{request.method}", "url": f"{request.url}"}}))
    response = await call_next(request)
    logger.info(json.dumps({"CorrelationId": f"{correlation_id}",
                            "response": {"status code": f"{response.status_code}"}}))
    return response


app.include_router(ProductsController.router, tags=["Products"])
app.include_router(UsersController.router, tags=["Users"])
app.include_router(CartController.router, tags=["Cart"])


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
