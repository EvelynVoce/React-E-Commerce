from AppConfig import app
import Cart.CartService as CartService
from fastapi import Request
from Cart.Models.Cart import CartItem, QuantityClass


@app.post("/api/addItemToCart")
async def add_item_to_cart(request: Request):
    data = await request.json()
    cart_instance = CartItem.from_dict(data)
    await CartService.add_item_to_cart(cart_instance)


@app.get("/api/getCartItems/{userId}")
async def get_cart_items(userId: str):
    products = await CartService.get_cart_items(userId)
    return products


@app.post("/api/updateQuantity")
async def update_quantity(request: Request):
    data = await request.json()
    quantity_instance = QuantityClass.from_dict(data)
    await CartService.update_quantity(quantity_instance)