import uuid
from Products.Models.SpecificProduct import SpecificProduct
from Products.Models.Products import Products
from database import get_db_connection
from typing import Optional


async def get_products() -> list[Products]:
    """
         Get all products from the database

        Returns:
            list[Products]: A list of Products objects representing the retrieved products. If no products are
            retrieved then returns an empty list
    """
    command = "EXEC dbo.get_products"
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command)
        results = [Products(id=uuid.UUID(row[0]), title=row[1], imagePath=row[2], retailer=row[3], cost=row[4])
                   for row in cursor]
    return results


async def get_item_details(item_id: uuid.UUID) -> Optional[list[SpecificProduct]]:
    """
         Get details on a specific item from the database (This returns extra info like description)

        Returns:
            Optional[list[SpecificProduct]]: Returns a list of specificProducts, this list will only ever include
            one element and is a list so that this backend can be consistent with the C# backend. This will be changed
            when appropriate.
            Returns None if ID not found
    """
    command = "EXEC dbo.get_item_details @itemId=?"
    params = item_id
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)
        row = cursor.fetchone()

    if row:
        return [SpecificProduct(id=uuid.UUID(row[0]), title=row[1], description=row[2],
                                imagePath=row[3], retailer=row[4], cost=row[5], link=row[6], product_type=row[7])]


async def get_product_types() -> list[str]:
    """
         Get list of products types in the database so that they can be selected through filters

        Returns:
            Optional[list[str]]: Returns a list of strings or an empty list if the database is empty
    """
    command = "EXEC dbo.get_product_types"
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command)
        results = [row[0] for row in cursor]
    return results


async def get_product_type(product_type: str) -> list[Products]:
    """
        Get products of a selected type (I.e. all skirts, dresses etc.)

        Returns:
            Optional[list[Products]]: Returns a list of Products or None if a given product_type is not in the database
    """
    command = "EXEC dbo.get_product_type @productType=?"
    params = product_type
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)
        results = [Products(id=uuid.UUID(row[0]), title=row[1], imagePath=row[2], retailer=row[3], cost=row[4])
                   for row in cursor]
    return results


async def search(criteria: str) -> list[Products]:
    """
        Get all products that match the search criteria

        Returns:
            Optional[list[Products]]: Returns a list of Products
    """
    command = "EXEC dbo.search_products @criteria=?"
    params = criteria
    db = get_db_connection()
    with db.cursor() as cursor:
        cursor.execute(command, params)
        results = [Products(id=uuid.UUID(row[0]), title=row[1], imagePath=row[2], retailer=row[3], cost=row[4])
                   for row in cursor]
    return results
