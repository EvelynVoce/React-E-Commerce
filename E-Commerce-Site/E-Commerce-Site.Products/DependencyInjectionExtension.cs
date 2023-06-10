namespace E_Commerce_Site.Products;

using Microsoft.Extensions.DependencyInjection;
public static class DependencyInjectionExtension
{
    public static IServiceCollection AddProducts(this IServiceCollection services)
    {
        return services
            .AddSingleton<IProductsService, ProductsService>();
    }
}