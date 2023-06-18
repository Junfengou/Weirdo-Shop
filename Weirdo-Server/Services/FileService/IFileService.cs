using Weirdo.Model;

namespace Weirdo.Services.FileService
{
    public interface IFileService
    {
        Task Upload(FileModel fileModel);
        Task<Stream> Get(string name);
    }
}
