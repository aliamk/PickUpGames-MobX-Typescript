using System;                               // DateTime
using System.Collections.Generic;           // Claim
using System.IdentityModel.Tokens.Jwt;      // JwtRegisteredClaimNames
using System.Security.Claims;               // Claim
using System.Text;
using System.Security.Cryptography;         // RandomNumberGenerator
using Application.Interfaces;
using Domain;
using Microsoft.Extensions.Configuration;   // IConfiguration
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        private readonly SymmetricSecurityKey _key;
        public JwtGenerator(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            // Generate sign-in credentials - validate credentials w/o querying the database
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(2),
                SigningCredentials = creds
            };
            // Generate and return the token
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        
        public RefreshToken GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return new RefreshToken{
                Token = Convert.ToBase64String(randomNumber)
            };
        }
    }
}