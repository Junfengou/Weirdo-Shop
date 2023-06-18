using Azure.Storage.Blobs;
using System.IO;
using Weirdo.Model;

namespace Weirdo.Services.FileService
{
    public class FileService : IFileService
    {
        private readonly BlobServiceClient _blobServiceClient;
        public FileService(BlobServiceClient blobServiceClient)
        {
            _blobServiceClient = blobServiceClient;
        }

        public async Task Upload(FileModel fileModel)
        {
            var containerInstance = _blobServiceClient.GetBlobContainerClient("product-image");
            var blobInstance = containerInstance.GetBlobClient(fileModel.ImageFile.FileName);

            await blobInstance.UploadAsync(fileModel.ImageFile.OpenReadStream());
        }

        public async Task<Stream> Get(string name)
        {
            var containerInstance = _blobServiceClient.GetBlobContainerClient("product-image");
            var blobInstance = containerInstance.GetBlobClient(name);
            var downloadContent = await blobInstance.DownloadAsync();
            return downloadContent.Value.Content;
        }
    }
}
