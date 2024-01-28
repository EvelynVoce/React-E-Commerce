import LikedItems.LikedItemsService as LikedItemsService
from fastapi import Request
from LikedItems.Models.LikedItems import LikedItem
from fastapi import APIRouter

router = APIRouter()


@router.post("/api/addLikedItem")
async def add_liked_item(request: Request) -> None:
    data = await request.json()
    liked_item_instance: LikedItem = LikedItem.from_dict(data)
    await LikedItemsService.add_liked_item(liked_item_instance)
