from database import get_db_connection
from Users.Models.Users import User
import uuid


async def get_available_user(username: str):
    command = f"EXEC dbo.available_username @username=?"
    params = (username,)
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)
        is_taken = cursor.fetchone()
    return not is_taken


async def add_user(user: User):
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
