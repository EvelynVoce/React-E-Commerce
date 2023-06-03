namespace E_Commerce_Site.Products;

public interface IProductsService
{
    Task<List<Models.Products>> GetProducts();
    Task<List<Models.Products>> GetItemDetails(string itemId);
}