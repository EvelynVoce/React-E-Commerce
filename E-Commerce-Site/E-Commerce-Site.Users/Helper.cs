namespace E_Commerce_Site.Users;

using System;
using System.Configuration;

public static class Helper
{
    public static string CnnVal(string name)
    {
        return ConfigurationManager.ConnectionStrings[name].ConnectionString;
    }
}