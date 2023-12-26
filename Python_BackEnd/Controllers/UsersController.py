from AppConfig import app
import Users.UsersService as UsersService


@app.get("/api/availableUsername/{username}")
async def get_available_user(username: str):
    details = await UsersService.get_available_user(username)
    return details
