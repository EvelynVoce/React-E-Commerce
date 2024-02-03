from fastapi import APIRouter
import Products.ProductsService as ProductsService
from Products.Models.Products import Products
from Products.Models.SpecificProduct import SpecificProduct
import uuid
# import json

router = APIRouter()

# An example for logging errors
# @router.get("/test")
# async def get_item_details() -> None:
#     try:
#         _ = 100/0
#     except ZeroDivisionError:
#         api_error_logger.exception(json.dumps({"func": "get_item_details", "message": "divide by zero"}))


@router.get("/api/getItemDetails/{item_id}")
async def get_item_details(item_id: uuid.UUID) -> list[SpecificProduct]:
    details: list[SpecificProduct] = await ProductsService.get_item_details(item_id)
    return details


@router.get("/api/getProducts")
async def get_products() -> list[Products]:
    products: list[Products] = await ProductsService.get_products()
    return products


@router.get("/api/getProductTypes")
async def get_product_types() -> list[str]:
    product_types: list[str] = await ProductsService.get_product_types()
    return product_types


@router.get("/api/getProductType/{product_type}")
async def get_product_type(product_type: str) -> list[Products]:
    products_of_type: list[Products] = await ProductsService.get_product_type(product_type)
    return products_of_type


@router.get("/api/search/{criteria}")
async def search(criteria: str) -> list[Products]:
    matched_products: list[Products] = await ProductsService.search(f"%{criteria}%")
    return matched_products
