namespace E_Commerce_Site.Cart;

using Microsoft.Extensions.DependencyInjection;
public static class DependencyInjectionExtension
{
    public static IServiceCollection AddCart(this IServiceCollection services)
    {
        return services
            .AddSingleton<ICartService, CartService>();
    }
}