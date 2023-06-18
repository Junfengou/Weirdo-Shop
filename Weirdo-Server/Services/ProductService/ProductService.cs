using Microsoft.EntityFrameworkCore;
using SuperHeroes_Project.Data;
using Weirdo.Model.EntityModels;

namespace Weirdo.Services
{
    public class ProductService : IProductService
    {
        private readonly DataContext _context;

        public ProductService(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Product>> GetAllProducts()
        {
            var productList = await _context.Products.ToListAsync();
            return productList;
        }

        public async Task<Product?> GetProduct(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(item => item.Id == id);

            if (product == null)
                return null;
            return product;
        }
        public async Task<List<Product>> AddProduct(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return await _context.Products.ToListAsync();
        }
        public async Task<List<Product>?> UpdateProduct(int id, Product updatedProduct)
        {
            var product = await _context.Products.FirstOrDefaultAsync(item => item.Id == id);

            if (product == null)
                return null;

            product.Name = String.IsNullOrEmpty(updatedProduct.Name) || updatedProduct.Name == "string" ? product.Name : updatedProduct.Name;
            product.Description = String.IsNullOrEmpty(updatedProduct.Description) || updatedProduct.Description == "string" ? product.Description : updatedProduct.Description;
            product.Price = updatedProduct.Price;
            await _context.SaveChangesAsync();

            return await _context.Products.ToListAsync();
        }
        public async Task<List<Product>?> RemoveProduct(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(item => item.Id == id);

            if (product == null)
                return null;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return await _context.Products.ToListAsync();
        }
    }
}
