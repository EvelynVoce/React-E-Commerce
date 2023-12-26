from dataclasses import dataclass


@dataclass
class Products:
    id: str = ""
    title: str = ""
    imagePath: str = ""
    retailer: str = ""
    cost: float = 0.0
