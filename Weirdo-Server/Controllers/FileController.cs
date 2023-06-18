using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Weirdo.Model;
using Weirdo.Services.FileService;

namespace Weirdo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> Upload([FromForm] FileModel file) 
        {
            await _fileService.Upload(file);
            return Ok("success");
        }

        [HttpGet]
        [Route("get")]
        public async Task<IActionResult> Get(string name)
        {
            var imageFileStream = await _fileService.Get(name);
            string fileType = "jpeg";
            if(name.Contains("png"))
            {
                fileType = "png";
            }
            return File(imageFileStream, $"image/{fileType}");
            
        }
    }
}
