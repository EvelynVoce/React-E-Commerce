namespace E_Commerce_Site.Controllers;

using Microsoft.AspNetCore.Mvc;
using E_Commerce_Site.Users;
using E_Commerce_Site.Users.Models;

[ApiController]
public class UsersController : ControllerBase
{
    
    private readonly IUsersService _usersService;
    
    public UsersController(IUsersService usersService)
    {
        _usersService = usersService;
    }

    [HttpPost("api/addUser")]
    public void AddUser([FromBody] User definition)
    {
        _usersService.AddUser(definition);
    }
}