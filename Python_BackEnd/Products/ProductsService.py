from Products.Models.SpecificProduct import SpecificProduct
from Products.Models.Products import Products
from database import get_db_connection


async def get_products():
    command = f"EXEC dbo.get_products"
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command)
        results = [Products(*row) for row in cursor]
    return results


async def get_item_details(item_id: str):
    command = f"EXEC dbo.get_item_details @itemId=?"
    params = (item_id,)
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)
        row = cursor.fetchone()

    if row:
        return [SpecificProduct(*row)]


async def get_product_types():
    command = f"EXEC dbo.get_product_types"
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command)
        results = [row[0] for row in cursor]
    return results


async def get_product_type(product_type: str):
    command = f"EXEC dbo.get_product_type @productType=?"
    params = (product_type,)
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)
        results = [Products(*row) for row in cursor]
    return results


async def search(criteria: str):
    command = f"EXEC dbo.search_products @criteria=?"
    params = (criteria,)
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)
        results = [Products(*row) for row in cursor]
    return results
