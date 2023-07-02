using Weirdo.Model.EntityModels;

namespace Weirdo.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProducts();
        Task<List<Product>> GetProductsForHomePage();
        Task<Product?> GetProduct(int id);
        Task<List<Product>> AddProduct(Product hero);
        Task<List<Product>?> UpdateProduct(int id, Product updatedHero);
        Task<List<Product>?> RemoveProduct(int id);
    }
}
