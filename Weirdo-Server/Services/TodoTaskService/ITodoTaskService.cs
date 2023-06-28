using Weirdo.Model.EntityModels;

namespace Weirdo.Services.TodoTaskService
{
    public interface ITodoTaskService
    {
        Task<List<TodoTask>> GetAllTodoTaskList();
        Task<List<TodoTask>> AddTodoTask(TodoTask todoTask);
        //Task<List<TodoTask>?> RemoveTodoTask(int id);
    }
}
