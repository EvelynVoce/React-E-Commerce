import Cart.CartService as CartService
from fastapi import Request
from Cart.Models.Cart import CartItem, QuantityClass, CartProductCombo
from fastapi import APIRouter

router = APIRouter()


@router.post("/api/addItemToCart")
async def add_item_to_cart(request: Request) -> None:
    data = await request.json()
    cart_instance: CartItem = CartItem.from_dict(data)
    await CartService.add_item_to_cart(cart_instance)


@router.get("/api/getCartItems/{userId}")
async def get_cart_items(userId: str) -> list[CartProductCombo]:
    products_in_cart: list[CartProductCombo] = await CartService.get_cart_items(userId)
    return products_in_cart


@router.post("/api/updateQuantity")
async def update_quantity(request: Request) -> None:
    data = await request.json()
    quantity_instance = QuantityClass.from_dict(data)
    await CartService.update_quantity(quantity_instance)


@router.post("/api/removeItem")
async def remove_item(request: Request) -> None:
    data = await request.json()
    await CartService.remove_item(data['cartId'])
