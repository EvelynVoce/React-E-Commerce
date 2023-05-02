namespace E_Commerce_Site.Products;

internal class Program
{
    internal static async Task Main(string[] args)
    {
        const string  myAllowSpecificOrigins = "_myAllowSpecificOrigins";
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddControllers();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: myAllowSpecificOrigins,
                policy  =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                });
    
        });

        var app = builder.Build();
        app.MapControllers();
        app.UseCors(myAllowSpecificOrigins);
        await app.RunAsync();
    }
}