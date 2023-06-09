﻿namespace E_Commerce_Site.Controllers;

using Microsoft.AspNetCore.Mvc;
using E_Commerce_Site.Products;
using Products.Models;


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
    
    [HttpGet("api/getProductType/{productType}")]
    public async Task<IActionResult> GetProductType([FromRoute] string productType)
    {
        var products = await _productsService.GetProductType(productType);
        return Ok(products);
    }
    
    [HttpGet("api/getProductTypes")]
    public async Task<IActionResult> GetProductTypes()
    {
        var productTypes = await _productsService.GetProductTypes();
        return Ok(productTypes);
    }
    
    [HttpGet("api/search/{criteria}")]
    public async Task<IActionResult> Search([FromRoute] string criteria)
    {
        var matchedProducts = await _productsService.Search($"%{criteria}%");
        return Ok(matchedProducts);
    }
}