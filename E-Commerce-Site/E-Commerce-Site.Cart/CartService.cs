namespace E_Commerce_Site.Cart;
using System.Data;
using System.Data.SqlClient;
using Models;

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
}
