using Microsoft.AspNetCore.Http;                // IFormFile
using Application.Photos;                       // PhotoUploadResult

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        PhotoUploadResult AddPhoto(IFormFile file);
        string DeletePhoto(string publicId);
    }
}