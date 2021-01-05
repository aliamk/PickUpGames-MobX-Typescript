using Microsoft.AspNetCore.Http;                // IFormFile

namespace Infrastructure
{
    public class IPhotoAccessor
    {
        PhotoUploadResult AddPhoto(IFormFile file);
        string DeletePhoto(string publicId);
    }
}