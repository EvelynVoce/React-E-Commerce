namespace E_Commerce_Site.Users;
using Models;

public class UsersService : IUsersService
{
    public void AddUser(User definition)
    {
        Console.WriteLine(definition.Username);
        Console.WriteLine(definition.Password);
    }

}
