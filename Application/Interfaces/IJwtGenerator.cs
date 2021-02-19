using Domain;           // AppUser

namespace Application.Interfaces
{
    public interface IJwtGenerator
    {
        string CreateToken(AppUser user);
        RefreshToken GenerateRefreshToken();
    }
}