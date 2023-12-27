from dataclasses import dataclass


@dataclass
class CartProductCombo:
    cartId: str = ""
    quantity: int = 0
    title: str = ""
    imagePath: str = ""
    retailer: str = ""
    cost: float = 0.0
