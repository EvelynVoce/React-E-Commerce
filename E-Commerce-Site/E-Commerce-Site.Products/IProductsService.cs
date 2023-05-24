namespace E_Commerce_Site.Products;

public interface IProductsService
{
    Task<List<Models.Products>> GetProducts();
}