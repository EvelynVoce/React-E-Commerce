namespace E_Commerce_Site.Cart.Models;
using System.ComponentModel.DataAnnotations.Schema;


[Table("public.cart")]
public class RecievedCartItem
{

    [Column("userID")]
    public string? UserId { get; set; } = "";
    
    [Column("productID")]
    public string ProductId { get; set; } = "";
    
    [Column("Quantity")]
    public int Quantity { get; set; } = 0;
}

[Table("public.cart")]
public class CartItem
{
    [Column("cartID")]
    public Guid CartId { get; set; } = new ();
    
    [Column("userID")]
    public Guid UserId { get; set; } = Guid.Empty;
    
    [Column("productID")]
    public Guid ProductId { get; set; } = Guid.Empty;
    
    [Column("Quantity")]
    public int Quantity { get; set; } = 0;
    
    public CartItem(Guid user, Guid product, int quantity)
    {
        CartId = Guid.NewGuid();
        UserId = user;
        ProductId = product;
        Quantity = quantity;
    }
}


[Table("public.cart")]
public class CartProductCombo
{
    [Column("cartID")]
    public string CartId { get; set; } = "";
    
    [Column("Quantity")]
    public int Quantity { get; set; } = 0;
    
    [Column("title")]
    public string Title { get; set; } = "";
    
    [Column("image_path")]
    public string ImagePath { get; set; } = "";
    
    [Column("[Retailer]")]
    public string Retailer { get; set; } = "";
    
    [Column("[cost]")]
    public decimal Cost { get; set; }
}