using System.ComponentModel.DataAnnotations;
using E_Commerce_Site.Controllers;
using Microsoft.VisualBasic.CompilerServices;

namespace E_Commerce_Site;

using Products;
using Users;
using Cart;
internal class Program
{
    internal static async Task Main(string[] args)
    {
        const string  myAllowSpecificOrigins = "_myAllowSpecificOrigins";

        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddControllers();

        builder.Services
            .AddProducts()
            .AddUsers()
            .AddCart();
        
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: myAllowSpecificOrigins,
                policy  =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                });
    
        });

        var app = builder.Build();

        if (!app.Environment.IsDevelopment())
        {
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();


        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");
        app.UseCors(myAllowSpecificOrigins);

        app.MapFallbackToFile("index.html");

        await app.RunAsync();
    }
}