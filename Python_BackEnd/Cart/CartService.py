from database import get_db_connection
from Cart.Models.Cart import CartItem, CartProductCombo


async def add_item_to_cart(cart: CartItem):
    command = f"EXEC dbo.addItemToCart @cartId='{cart.cartId}', @userId='{cart.userId}', @productId='{cart.productId}', @quantity='{cart.quantity}'"
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command)


async def get_cart_items(user_id: str):
    command = f"EXEC dbo.get_cart_items @userId='{user_id}'"
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command)
        results = [CartProductCombo(*row) for row in cursor]
    return results 
