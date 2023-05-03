namespace E_Commerce_Site.Products.Controllers;

using Microsoft.AspNetCore.Mvc;



[ApiController]
public class ProductsController : ControllerBase
{
    
    private readonly IProductsService _productsService;
    
    public ProductsController(IProductsService registrationService)
    {
        _productsService = registrationService;
    }

    [HttpPost("api/getProducts")]
    public void ConfirmAttendance()
    {
        _productsService.GetProducts();
    }
}