namespace E_Commerce_Site.Products;

using System.Data;
using System.Data.SqlClient;
using Models;

public class ProductsService : IProductsService
{
    public async Task<List<Products>> GetProducts()
    {
        var results = new List<Products>();
        await using (SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm")))
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
                    Retailer = (string)reader[3],
                    Cost = (decimal)reader[4],
                });
            }
            await reader.CloseAsync();
        }
        return results;
    }

    public async Task<List<SpecificProduct>> GetItemDetails(string itemId)
    {
        var results = new List<SpecificProduct>();
        await using (SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm")))
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
    
    public async Task<List<Products>> GetProductType(string productType)
    {
        var results = new List<Products>();
        await using (SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm")))
        {
            SqlCommand command = new SqlCommand("dbo.get_product_type", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@productType", productType);
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
                    Retailer = (string)reader[3],
                    Cost = (decimal)reader[4],
                });
            }
            await reader.CloseAsync();
        }
        return results;
    }
    
    public async Task<List<string>> GetProductTypes()
    {
        var results = new List<string>();
        await using (SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm")))
        {
            SqlCommand command = new SqlCommand("dbo.get_product_types", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Connection.Open();
            SqlDataReader reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                results.Add((string)reader[0]);
            }
            await reader.CloseAsync();
        }
        return results;
    }
    
    public async Task<List<Products>> Search(string criteria)
    {
        var results = new List<Products>();
        await using (SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm")))
        {
            SqlCommand command = new SqlCommand("dbo.search_products", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@criteria", criteria);
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
                    Retailer = (string)reader[3],
                    Cost = (decimal)reader[4],
                });
            }
            await reader.CloseAsync();
        }
        return results;
    }

}
