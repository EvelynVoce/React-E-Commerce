namespace E_Commerce_Site.Cart;

using System;
using System.Configuration;

public static class Helper
{
    public static string CnnVal(string name)
    {
        return ConfigurationManager.ConnectionStrings[name].ConnectionString;
    }
}