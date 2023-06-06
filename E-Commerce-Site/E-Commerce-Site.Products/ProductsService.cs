﻿namespace E_Commerce_Site.Products;

using System.Data;
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
                var path = reader[2] == DBNull.Value ? "" : (string)reader[2];
                results.Add(new Products
                {
                    Id = reader[0].ToString(),
                    Title = (string)reader[1],
                    ImagePath = path,
                });
            }
            await reader.CloseAsync();
        }
        return results;
    }

    public async Task<List<SpecificProduct>> GetItemDetails(string itemId)
    {
        var results = new List<SpecificProduct>();
        await using (SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm_Products")))
        {
            SqlCommand command = new SqlCommand("dbo.get_item_details", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@itemId", itemId);
            command.Connection.Open();
            SqlDataReader reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                var path = reader[3] == DBNull.Value ? "" : (string)reader[3];
                results.Add(new SpecificProduct()
                {
                    Id = reader[0].ToString(),
                    Title = (string)reader[1],
                    Description = (string)reader[2],
                    ImagePath = path,
                    Retailer = (string)reader[4],
                    Cost = (decimal)reader[5],
                    Link = (string)reader[6],
                });
            }
            await reader.CloseAsync();
        }
        return results;
    }

}
