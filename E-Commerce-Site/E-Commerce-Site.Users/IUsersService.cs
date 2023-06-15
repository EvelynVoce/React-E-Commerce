namespace E_Commerce_Site.Users;
using Models;
public interface IUsersService
{
    Task AddUser(User definition);
    Task<bool> GetAvailableUser(string username);
}