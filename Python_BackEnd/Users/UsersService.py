from database import get_db_connection
from Users.Models.Users import User
import uuid


# Returns a boolean value representing if username is taken or not
async def get_available_user(username: str) -> bool:
    command = f"EXEC dbo.available_username @username=?"
    params = username
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)
        is_taken: bool = cursor.fetchone()
    return not is_taken


# Adds a new user to the database
async def add_user(user: User) -> None:
    user_id = uuid.uuid4()
    command = "EXEC dbo.addUser @userId=?, @username=?, @password=?"
    params = (
        user_id,
        user.username,
        user.password
    )
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)


# Login and returns the userID of the user if login successful
async def login(user: User):
    command = "EXEC dbo.login @username=?, @password=?"
    params = (user.username, user.password)
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)
        result = cursor.fetchone()
        if result:
            user_id: str = result[0]
            user_uid = uuid.UUID(user_id)
            return user_uid
