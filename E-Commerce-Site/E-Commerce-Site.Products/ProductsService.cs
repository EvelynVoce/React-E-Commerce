﻿namespace E_Commerce_Site.Products;

using System.Data;
using Dapper;
using System.Data.SqlClient;
using Models;

public class ProductsService : IProductsService
{
    public async Task<List<Products>> GetProducts()
    {
        var results = new List<Products>();
        await using (SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm_Products")))
        {
            SqlCommand command = new SqlCommand("dbo.get_products", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Connection.Open();
            SqlDataReader reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                var path = reader[2] == DBNull.Value ? "This Was Null" : (string)reader[2];
                results.Add(new Products
                {
                    Id = reader[0].ToString(),
                    Title = (string)reader[1],
                    ImagePath = path,
                });
            }
            await reader.CloseAsync();
        }


        foreach (var item in results)
        {
            Console.WriteLine($"ID:{item.Id}\nTitle:{item.Title}\nImage:{item.ImagePath}");
        }

        return results;
    }

    public async Task<List<Products>> GetItemDetails(string itemId)
    {
        Console.WriteLine($"Get Item Details: {itemId}");
        throw new NotImplementedException();
    }
    
    
}
