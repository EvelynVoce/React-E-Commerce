from fastapi import Request, APIRouter
import Users.UsersService as UsersService
from Users.Models.Users import User
import uuid

router = APIRouter()


@router.get("/api/availableUsername/{username}")
async def get_available_user(username: str) -> bool:
    details = await UsersService.get_available_user(username)
    return details


@router.post("/api/addUser")
async def add_user(request: Request) -> None:
    data = await request.json()
    user_instance = User.from_dict(data)
    await UsersService.add_user(user_instance)


@router.post("/api/login")
async def login(request: Request):
    data = await request.json()
    user_instance = User.from_dict(data)
    return await UsersService.login(user_instance)
