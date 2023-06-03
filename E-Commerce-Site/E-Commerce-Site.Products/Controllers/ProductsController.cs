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

    [HttpGet("api/getProducts")]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _productsService.GetProducts();
        return Ok(products);
    }
    
    [HttpGet("api/getItemDetails/{itemId}")]
    public async Task<IActionResult> GetItemDetails([FromRoute] string itemId)
    {
        var products = await _productsService.GetItemDetails(itemId);
        return Ok(products);
    }
}