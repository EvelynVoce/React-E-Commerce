from database import get_db_connection
from LikedItems.Models.LikedItems import LikedItem
import uuid


async def add_liked_item(liked_items: LikedItem) -> None:
    """
        Adds an item to the users list of liked_items
        Returns: None
   """
    command = "EXEC dbo.addLikedItem @userId=?, @productId=?"
    params = (
        liked_items.userId,
        liked_items.productId,
    )
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)
