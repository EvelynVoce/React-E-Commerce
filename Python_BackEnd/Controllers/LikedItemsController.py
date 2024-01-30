import LikedItems.LikedItemsService as LikedItemsService
from fastapi import Request
from LikedItems.Models.LikedItems import LikedItem
from fastapi import APIRouter
from Products.Models.Products import Products

router = APIRouter()


@router.post("/api/addLikedItem")
async def add_liked_item(request: Request) -> None:
    data = await request.json()
    liked_item_instance: LikedItem = LikedItem.from_dict(data)
    await LikedItemsService.add_liked_item(liked_item_instance)


@router.get("/api/get_liked_items/{userId}")
async def get_liked_items(userId: str) -> list[Products]:
    liked_items: list[Products] = await LikedItemsService.get_liked_items(userId)
    return liked_items
