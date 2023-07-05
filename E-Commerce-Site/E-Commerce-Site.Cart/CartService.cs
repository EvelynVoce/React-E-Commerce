using System.Xml;

namespace E_Commerce_Site.Cart;
using System.Data;
using System.Data.SqlClient;
using Models;
using Products.Models;
public class CartService : ICartService
{
    public async Task AddItemToCart(CartItem cart)
    {
        await using SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm"));
        Guid uniqueId = Guid.NewGuid();

        await connection.OpenAsync();
        await using SqlCommand command = new SqlCommand("[addItemToCart]", connection);
        command.CommandType = CommandType.StoredProcedure;

        command.Parameters.AddWithValue("@cartId", cart.CartId);
        command.Parameters.AddWithValue("@userId", cart.UserId);
        command.Parameters.AddWithValue("@productId", cart.ProductId);
        command.Parameters.AddWithValue("@quantity", cart.Quantity);

        await command.ExecuteNonQueryAsync();
    }
    
    public async Task<List<Guid>> GetCartProductIds(string userId)
    {
        var results = new List<Guid>();
        await using (SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm")))
        {
            SqlCommand command = new SqlCommand("dbo.get_cart_product_ids", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@userId", userId);
            command.Connection.Open();
            SqlDataReader reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                results.Add(
                    Guid.Parse(reader[0].ToString())
                );
            }
            await reader.CloseAsync();
        }
        return results;
    }
    
    public async Task<List<Products>> GetProductsInCart(string productIdsInCart)
    {
        var results = new List<Products>();
        await using (SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm")))
        {
            SqlCommand command = new SqlCommand("dbo.get_products_in_cart", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@productIdList", productIdsInCart);
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
