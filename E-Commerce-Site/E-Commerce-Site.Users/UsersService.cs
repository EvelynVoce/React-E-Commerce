namespace E_Commerce_Site.Users;
using System.Data;
using System.Data.SqlClient;
using Models;

public class UsersService : IUsersService
{
    public async Task AddUser(User user)
    {
        await using SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm"));
        Guid uniqueId = Guid.NewGuid();

        await connection.OpenAsync();
        await using SqlCommand command = new SqlCommand("addUser", connection);
        command.CommandType = CommandType.StoredProcedure;

        command.Parameters.AddWithValue("@userId", uniqueId);
        command.Parameters.AddWithValue("@username", user.Username);
        command.Parameters.AddWithValue("@password", user.Password);

        await command.ExecuteNonQueryAsync();
    }

    public async Task<bool> GetAvailableUser(string username)
    {
        await using SqlConnection connection = new SqlConnection(Helper.CnnVal("EComm"));
        SqlCommand command = new SqlCommand("dbo.[available_username]", connection);
        command.CommandType = CommandType.StoredProcedure;
        command.Parameters.AddWithValue("@username", username);

        await command.Connection.OpenAsync();
        await using SqlDataReader reader = await command.ExecuteReaderAsync();
        var isTaken = await reader.ReadAsync();

        await reader.CloseAsync();
        return !isTaken;
    }
}
