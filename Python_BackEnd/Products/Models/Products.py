import uuid
from dataclasses import dataclass


@dataclass
class Products:
    id: uuid.UUID = ""
    title: str = ""
    imagePath: str = ""
    retailer: str = ""
    cost: float = 0.0
