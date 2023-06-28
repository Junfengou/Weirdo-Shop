namespace Weirdo.Model.EntityModels
{
    public class TodoTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTimeOffset? DateCreated { get; set; }
    }
}
