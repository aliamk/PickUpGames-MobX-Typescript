using System;
using Application.Interfaces;               // IPhotoAccessor
using Application.Photos;                   // IPhotoAccessor
using CloudinaryDotNet;                     // Cloudinary
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;         // IOptions

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;
        public PhotoAccessor(IOptions<CloudinarySettings> config)           // Get strongly-typed access to user-secrets 
        {
            var acc = new Account
            (
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        public PhotoUploadResult AddPhoto(IFormFile file)                     // Add photo method
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())                     // Add a photo to the stream that is uploaded to Cloudinary
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            if (uploadResult.Error != null)
                throw new Exception(uploadResult.Error.Message);

            return new PhotoUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUri.AbsoluteUri                        // Produces a download uri of the photo
            };
        }

        public string DeletePhoto(string publicId)
        {
            throw new System.NotImplementedException();
            // var deleteParams = new DeletionParams(publicId);
            // var result = _cloudinary.Destroy(deleteParams);
            // return result.Result == "ok" ? result.Result : null;
        }
    }
}