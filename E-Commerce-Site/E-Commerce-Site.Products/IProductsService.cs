namespace E_Commerce_Site.Products;

public interface IProductsService
{
    Task<List<Models.Products>> GetProducts();
    Task<List<Models.SpecificProduct>> GetItemDetails(string itemId);
}