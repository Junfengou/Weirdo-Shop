using SuperHeroes_Project.Data;
using Weirdo.Model.EntityModels;

namespace Weirdo.Services.TodoTaskService
{
    public class TodoTaskService : ITodoTaskService
    {
        private readonly DataContext _context;
        public TodoTaskService(DataContext context)
        {
            _context = context;
        }
        public async Task<List<TodoTask>> GetAllTodoTaskList()
        {
            return await _context.TodoTask.ToListAsync();
        }

        public async Task<List<TodoTask>> AddTodoTask(TodoTask todoTask)
        {
            await _context.TodoTask.AddAsync(todoTask);
            await _context.SaveChangesAsync();
            return await _context.TodoTask.ToListAsync();
        }
    }
}
