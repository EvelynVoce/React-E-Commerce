namespace E_Commerce_Site.Cart;
using Models;
public interface ICartService
{
    Task AddItemToCart(CartItem definition);
    Task<List<Guid>> GetCartProductIds(string userId);
}