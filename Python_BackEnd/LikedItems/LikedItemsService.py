from database import get_db_connection
from LikedItems.Models.LikedItems import LikedItem
import uuid
from Products.Models.Products import Products


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


async def get_liked_items(user_id: str) -> list[Products]:
    """
        Gets all liked items for a given userID
        Returns: list[Products] A list of all products the user has liked
   """
    command = "EXEC dbo.get_liked_items @userId=?"
    params = user_id
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)
        results = [Products(id=uuid.UUID(row[0]), title=row[1], imagePath=row[2],
                            retailer=row[3], cost=row[4]) for row in cursor]
    return results
