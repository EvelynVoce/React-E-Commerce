from AppConfig import app
from fastapi import HTTPException
import uuid
import Products.ProductsService as ProductsService


@app.get("/api/getItemDetails/{item_id}")
async def get_item_details(item_id: str):
    try:
        item_uuid = uuid.UUID(item_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid item_id format. Must be a valid UUID.")

    details = await ProductsService.get_item_details(item_uuid)
    return details


@app.get("/api/getProducts/")
async def get_products():
    results = await ProductsService.get_products()
    return results


@app.get("/api/getProductTypes/")
async def get_product_types():
    product_types = await ProductsService.get_product_types()
    return product_types


@app.get("/api/getProductType/{product_type}")
async def get_product_type(product_type: str):
    products = await ProductsService.get_product_type(product_type)
    return products
