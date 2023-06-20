using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Weirdo.Model;
using Weirdo.Model.EntityModels;
using Weirdo.Services.FileService;

namespace Weirdo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : Controller
    {
        private readonly IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost]
        [Route("upload")]
        public async Task<ActionResult<string>> Upload([FromForm] FileModel file) 
        {
            JsonResult result;
            var path = await _fileService.Upload(file);
            result = Json(new { urlPath = path });
            result.StatusCode = (int)HttpStatusCode.OK;

            return result;
            //return Ok("success");
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
