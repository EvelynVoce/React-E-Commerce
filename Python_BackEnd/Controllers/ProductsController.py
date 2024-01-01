from fastapi import APIRouter
import uuid
import Products.ProductsService as ProductsService

router = APIRouter()


@router.get("/api/getItemDetails/{item_id}")
async def get_item_details(item_id: uuid.UUID):
    details = await ProductsService.get_item_details(item_id)
    return details


@router.get("/api/getProducts/")
async def get_products():
    results = await ProductsService.get_products()
    return results


@router.get("/api/getProductTypes/")
async def get_product_types():
    product_types = await ProductsService.get_product_types()
    return product_types


@router.get("/api/getProductType/{product_type}")
async def get_product_type(product_type: str):
    products = await ProductsService.get_product_type(product_type)
    return products


@router.get("/api/search/{criteria}")
async def get_product_type(criteria: str):
    matched_products = await ProductsService.search(f"%{criteria}%")
    return matched_products
