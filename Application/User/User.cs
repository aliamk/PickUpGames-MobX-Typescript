using System.Linq;
using System.Text.Json.Serialization;           // JsonIgnore
using Application.Interfaces;                   // IJwtGenerator
using Domain;                                   // AppUser

// What should be returned when user logins

namespace Application.User
{    
    public class User
    {
        public User(AppUser user, IJwtGenerator jwtGenerator, string refreshToken) 
        {
            DisplayName = user.DisplayName;
            Token = jwtGenerator.CreateToken(user);
            Username = user.UserName;
            Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url;
            RefreshToken = refreshToken;              
        }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }
        
        [JsonIgnore]  // set as cookie that we return to the client
        public string RefreshToken { get; set; }
    }
}