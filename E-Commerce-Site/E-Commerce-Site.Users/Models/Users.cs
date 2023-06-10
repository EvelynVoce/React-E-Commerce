namespace E_Commerce_Site.Users.Models;
using System.ComponentModel.DataAnnotations.Schema;


[Table("public.users")]
public class User
{
    [Column("username")]
    public string? Username { get; set; } = "";
    
    [Column("password")]
    public string? Password { get; set; } = "";
}