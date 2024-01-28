import uuid
from pydantic import BaseModel


class LikedItem(BaseModel):
    userId: uuid.UUID = ""
    productId: uuid.UUID = ""

    @classmethod
    def from_dict(cls, liked):
        return cls(userId=uuid.UUID(liked.get('userID', '')),
                   productId=uuid.UUID(liked.get('productID', '')))
