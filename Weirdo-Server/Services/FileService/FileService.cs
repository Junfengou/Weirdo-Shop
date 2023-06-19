using Azure.Storage.Blobs;
using Weirdo.Model;
using Microsoft.Extensions.Hosting;

namespace Weirdo.Services.FileService
{
    public class FileService : IFileService
    {
        private readonly BlobServiceClient _blobServiceClient;
        private readonly IHostEnvironment _hostEnvironment;
        public FileService(BlobServiceClient blobServiceClient, IHostEnvironment hostEnvironment)
        {
            _blobServiceClient = blobServiceClient;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<string> Upload(FileModel fileModel)
        {
            var currentEnvironment = _hostEnvironment.EnvironmentName;
            var containerInstance = _blobServiceClient.GetBlobContainerClient(currentEnvironment == "Development" ? "product-image" : "product-image-prod");
            var blobInstance = containerInstance.GetBlobClient(fileModel.ImageFile.FileName);
            var path = blobInstance.Uri.AbsoluteUri;
            await blobInstance.UploadAsync(fileModel.ImageFile.OpenReadStream());
            return path;
        }

        public async Task<Stream> Get(string name)
        {
            var currentEnvironment = _hostEnvironment.EnvironmentName;
            var containerInstance = _blobServiceClient.GetBlobContainerClient(currentEnvironment == "Development" ? "product-image" : "product-image-prod");
            var blobInstance = containerInstance.GetBlobClient(name);
            var downloadContent = await blobInstance.DownloadAsync();
            return downloadContent.Value.Content;
        }
    }
}
