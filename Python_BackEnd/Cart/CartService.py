from database import get_db_connection
from Cart.Models.Cart import CartProductCombo


async def get_cart_items(user_id: str):
    command = f"EXEC dbo.get_cart_items @userId='{user_id}'"
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command)
        results = [CartProductCombo(*row) for row in cursor]
    return results
