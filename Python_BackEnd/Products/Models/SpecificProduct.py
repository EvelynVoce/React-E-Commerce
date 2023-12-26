from dataclasses import dataclass


@dataclass
class SpecificProduct:
    id: str = ""
    title: str = ""
    description: str = ""
    imagePath: str = ""
    retailer: str = ""
    cost: float = 0.0
    link: str = ""
    product_type: str = ""
