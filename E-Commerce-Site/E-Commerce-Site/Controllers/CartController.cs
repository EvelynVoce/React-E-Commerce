using E_Commerce_Site.Cart;
using E_Commerce_Site.Cart.Models;

namespace E_Commerce_Site.Controllers;
using Microsoft.AspNetCore.Mvc;

[ApiController]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;
    
    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpPost("api/addItemToCart")]
    public async Task AddItemToCart([FromBody] RecievedCartItem receivedCartItem)
    {
        Guid.TryParse(receivedCartItem.UserId, out Guid userId);
        Guid.TryParse(receivedCartItem.ProductId, out Guid productId);
        
        var cart = new CartItem(
            userId,
            productId,
            receivedCartItem.Quantity
        );
        
        await _cartService.AddItemToCart(cart);
    }
    
    [HttpGet("api/getCartItems/{userId}")]
    public async Task<IActionResult> GetCartProductIds([FromRoute] string userId)
    {
        Console.WriteLine("got here\n\n\n");
        var products = await _cartService.GetCartProductIds(userId);
        return Ok(products);
    }
}



