from database import get_db_connection
from LikedItems.Models.LikedItems import LikedItem
import uuid


async def add_liked_item(liked_items: LikedItem) -> None:
    """
        Adds an item to the users list of liked_items
        Returns: None
   """
    print(liked_items)
