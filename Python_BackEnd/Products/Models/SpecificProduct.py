import uuid
from dataclasses import dataclass
from decimal import Decimal


@dataclass
class SpecificProduct:
    id: uuid.UUID = ""
    title: str = ""
    description: str = ""
    imagePath: str = ""
    retailer: str = ""
    cost: Decimal = 0.0
    link: str = ""
    product_type: str = ""
