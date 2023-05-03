namespace E_Commerce_Site.Products.Controllers;

using Microsoft.AspNetCore.Mvc;



[ApiController]
public class ProductsController : ControllerBase
{
    [HttpPost("api/getProducts")]
    public void ConfirmAttendance()
    {
        Console.WriteLine("test1");
    }
}