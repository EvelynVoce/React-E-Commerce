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
    
    public async Task<List<CartProductCombo>> GetCartItems(string userId)
    {
        var results = new List<CartProductCombo>();
        await using (SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm")))
        {
            SqlCommand command = new SqlCommand("dbo.get_cart_items", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@userId", userId);
            command.Connection.Open();
            SqlDataReader reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                Console.WriteLine(reader[0]);
                Console.WriteLine(reader[1]);
                Console.WriteLine(reader[2]);
                Console.WriteLine(reader[3]);
                Console.WriteLine(reader[4]);
                Console.WriteLine(reader[5]);
                var path = reader[3] == DBNull.Value ? "" : (string)reader[3];
                results.Add( new CartProductCombo
                {
                    CartId = reader[0].ToString(),
                    Quantity = (int)reader[1],
                    Title = (string)reader[2],
                    ImagePath = path,
                    Retailer = (string)reader[4],
                    Cost = (decimal)reader[5],
                });
            }
            await reader.CloseAsync();
        }
        return results;
    }
    
    public async Task UpdateQuantity(CartIdClass cart)
    {
        await using SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm"));
        await connection.OpenAsync();
        await using SqlCommand command = new SqlCommand("[alterQuantity]", connection);
        command.CommandType = CommandType.StoredProcedure;

        command.Parameters.AddWithValue("@cartId", cart.CartId);
        command.Parameters.AddWithValue("@quantity_change", cart.QuantityChange);

        await command.ExecuteNonQueryAsync();
    }
}
