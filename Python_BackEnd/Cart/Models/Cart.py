from dataclasses import dataclass
import uuid


@dataclass
class CartItem:
    cartId: str = ""
    userId: str = ""
    productId: str = ""
    quantity: int = 0

    @classmethod
    def from_dict(cls, cart_dict):
        return cls(cartId=uuid.uuid4(),
                   userId=uuid.UUID(cart_dict.get('userID', '')),
                   productId=uuid.UUID(cart_dict.get('productID', '')),
                   quantity=cart_dict.get('quantity', ''))


@dataclass
class CartProductCombo:
    cartId: str = ""
    quantity: int = 0
    title: str = ""
    imagePath: str = ""
    retailer: str = ""
    cost: float = 0.0


