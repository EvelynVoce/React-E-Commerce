import uuid
from decimal import Decimal
from pydantic import BaseModel


class SpecificProduct(BaseModel):
    id: uuid.UUID = ""
    title: str = ""
    description: str = ""
    imagePath: str = ""
    retailer: str = ""
    cost: Decimal = 0.0
    link: str = ""
    product_type: str = ""
