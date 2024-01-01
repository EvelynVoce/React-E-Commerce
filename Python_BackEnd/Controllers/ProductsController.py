from AppConfig import app
import uuid
import Products.ProductsService as ProductsService


@app.get("/api/getItemDetails/{item_id}")
async def get_item_details(item_id: uuid.UUID):
    details = await ProductsService.get_item_details(item_id)
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


@app.get("/api/search/{criteria}")
async def get_product_type(criteria: str):
    matched_products = await ProductsService.search(f"%{criteria}%")
    return matched_products
