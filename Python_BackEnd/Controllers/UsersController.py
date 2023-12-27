from AppConfig import app
import Users.UsersService as UsersService
from fastapi import Request
from Users.Models.Users import User


@app.get("/api/availableUsername/{username}")
async def get_available_user(username: str):
    details = await UsersService.get_available_user(username)
    return details


@app.post("/api/addUser")
async def add_user(request: Request):
    data = await request.json()
    user_instance = User.from_dict(data)
    print(user_instance)
    await UsersService.add_user(user_instance)
0()