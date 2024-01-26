import uuid
from decimal import Decimal
from pydantic import BaseModel


class Products(BaseModel):
    id: uuid.UUID = ""
    title: str = ""
    imagePath: str = ""
    retailer: str = ""
    cost: Decimal = 0.0
