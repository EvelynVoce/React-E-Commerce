from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Controllers import ProductsController, UsersController, CartController
import uvicorn


app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ProductsController.router, tags=["Products"])
app.include_router(UsersController.router, tags=["Users"])
app.include_router(CartController.router, tags=["Cart"])


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
