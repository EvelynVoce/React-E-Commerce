namespace E_Commerce_Site.Products;

using Microsoft.Extensions.DependencyInjection;
public static class DependencyInjection
{
    public static IServiceCollection AddProducts(this IServiceCollection services)
    {
        return services
            .AddSingleton<IProductsService, ProductsService>();
    }
}