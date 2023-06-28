using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Weirdo.Model.EntityModels;
using Weirdo.Services;
using Weirdo.Services.TodoTaskService;

namespace Weirdo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoTaskController : ControllerBase
    {
        private readonly ITodoTaskService _todoTaskService;

        public TodoTaskController(ITodoTaskService todoTaskService)
        {
            _todoTaskService = todoTaskService;
        }

        [HttpGet]
        public async Task<ActionResult<List<TodoTask>>> GetAllTodoTask()
        {
           return await _todoTaskService.GetAllTodoTaskList();
        }

        [HttpPost]
        public async Task<ActionResult<List<TodoTask>>> Add(TodoTask todoTask)
        {
            return await _todoTaskService.AddTodoTask(todoTask);
        }
    }
}
