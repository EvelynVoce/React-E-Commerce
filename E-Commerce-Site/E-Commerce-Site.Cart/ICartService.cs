namespace E_Commerce_Site.Cart;
using Models;
public interface ICartService
{
    Task AddItemToCart(CartItem definition);
    Task<List<CartProductCombo>> GetCartItems(string userId);
    
    Task UpdateQuantity(QuantityClass cart);
    Task RemoveItem(CartIdItem cart);
}

