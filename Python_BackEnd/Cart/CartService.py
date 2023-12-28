from database import get_db_connection
from Cart.Models.Cart import CartItem, CartProductCombo, QuantityClass


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


async def update_quantity(cart: QuantityClass):
    command = f"EXEC dbo.alterQuantity @cartId='{cart.cartId}', @quantity_change='{cart.quantityChange}'"
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command)


async def remove_item(cart_id: str):
    command = f"EXEC dbo.remove_item @cartId='{cart_id}'"
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command)
