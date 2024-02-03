from fastapi import APIRouter, Request
import LikedItems.LikedItemsService as LikedItemsService
from LikedItems.Models.LikedItems import LikedItem
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


@router.get("/api/get_is_liked/{userId}/{itemId}")
async def get_is_liked(userId: str, itemId) -> bool:
    is_liked: bool = await LikedItemsService.get_is_liked(userId, itemId)
    return is_liked
