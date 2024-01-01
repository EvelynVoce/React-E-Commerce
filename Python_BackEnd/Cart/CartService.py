from database import get_db_connection
from Cart.Models.Cart import CartItem, CartProductCombo, QuantityClass


async def add_item_to_cart(cart: CartItem):
    command = "EXEC dbo.addItemToCart @cartId=?, @userId=?, @productId=?, @quantity=?"
    params = (
        cart.cartId,
        cart.userId,
        cart.productId,
        cart.quantity
    )
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)


async def get_cart_items(user_id: str):
    command = "EXEC dbo.get_cart_items @userId=?"
    params = (user_id,)
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)
        results = [CartProductCombo(*row) for row in cursor]
    return results


async def update_quantity(cart: QuantityClass):
    command = "EXEC dbo.alterQuantity @cartId=?, @quantity_change=?"
    params = (cart.cartId, cart.quantityChange)
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)


async def remove_item(cart_id: str):
    command = "EXEC dbo.remove_item @cartId=?"
    params = (cart_id,)
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)
