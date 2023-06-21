namespace E_Commerce_Site.Controllers;

using Microsoft.AspNetCore.Mvc;
using Users;
using Users.Models;

[ApiController]
public class UsersController : ControllerBase
{
    
    private readonly IUsersService _usersService;
    
    public UsersController(IUsersService usersService)
    {
        _usersService = usersService;
    }

    [HttpPost("api/addUser")]
    public async Task AddUser([FromBody] User definition)
    {
        await _usersService.AddUser(definition);
    }
    
    [HttpGet("api/availableUsername/{username}")]
    public async Task<IActionResult> GetAvailableUser([FromRoute] string username)
    {
        bool available = await _usersService.GetAvailableUser(username);
        return Ok(available);
    }
    
    [HttpPost("api/login")]
    public async Task<IActionResult> Login([FromBody] User definition)
    {
        bool successfulLLogin = await _usersService.Login(definition);
        return Ok(successfulLLogin);
    }
}