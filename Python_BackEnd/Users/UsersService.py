from database import get_db_connection


async def get_available_user(username: str):
    command = f"EXEC dbo.available_username @username='{username}'"
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command)
        is_taken = cursor.fetchone()
    print(not is_taken)
    return not is_taken
