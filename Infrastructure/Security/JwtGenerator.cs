using System;
using Application.Interfaces;           // IJwtGenerator
using Domain;                           // AppUser

namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        public string CreateToken(AppUser user)
        {
            throw new NotImplementedException();
        }
    }
}
