from AppConfig import app
import Cart.CartService as CartService


@app.get("/api/getCartItems/{userId}")
async def get_cart_items(userId: str):
    products = await CartService.get_cart_items(userId)
    return products
