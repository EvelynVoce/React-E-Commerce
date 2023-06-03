namespace E_Commerce_Site.Products.Models;
using System.ComponentModel.DataAnnotations.Schema;


[Table("public.products")]
public class Products
{
    [Column("id")]
    public string Id { get; set; } = "";
    
    [Column("[title]")]
    public string Title { get; set; } = "";

    [Column("[image_path]")]
    public string ImagePath { get; set; } = "";
}