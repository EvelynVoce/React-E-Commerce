namespace E_Commerce_Site.Products;

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
                var path = reader[3] == DBNull.Value ? "This Was Null" : (string)reader[3];
                results.Add(new Products
                {
                    Id = reader[0].ToString(),
                    Title = (string)reader[1],
                    Description = (string)reader[2],
                    ImagePath = path,
                });
            }
            await reader.CloseAsync();
        }


        foreach (var item in results)
        {
            Console.WriteLine($"{item.Id}\t{item.Title}\t{item.Description}\t{item.ImagePath}");
        }

        return results;
    }
}
