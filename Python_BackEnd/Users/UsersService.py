from database import get_db_connection
from Users.Models.Users import User
import uuid


async def get_available_user(username: str):
    command = f"EXEC dbo.available_username @username='{username}'"
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command)
        is_taken = cursor.fetchone()
    print("not is taken ", not is_taken)
    return not is_taken


async def add_user(user: User):
    user_id = uuid.uuid4()
    command = f"EXEC dbo.addUser @userId='{user_id}', @username='{user.username}', @password='{user.password}'"
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command)


async def login(user: User):
    command = f"EXEC dbo.login @username='{user.username}', @password='{user.password}'"
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command)
        result = cursor.fetchone()
        if result:
            user_id: str = result[0]
            user_uid = uuid.UUID(user_id)
            return user_uid


