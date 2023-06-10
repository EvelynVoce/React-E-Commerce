namespace E_Commerce_Site.Users;

using Microsoft.Extensions.DependencyInjection;
public static class DependencyInjectionExtension
{
    public static IServiceCollection AddUsers(this IServiceCollection services)
    {
        return services
            .AddSingleton<IUsersService, UsersService>();
    }
}