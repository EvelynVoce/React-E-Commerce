import uuid
from dataclasses import dataclass
from decimal import Decimal


@dataclass
class Products:
    id: uuid.UUID = ""
    title: str = ""
    imagePath: str = ""
    retailer: str = ""
    cost: Decimal = 0.0
