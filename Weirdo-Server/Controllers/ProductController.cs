﻿using Microsoft.AspNetCore.Mvc;
using Weirdo.Model;
using Weirdo.Services;

namespace Weirdo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAllProducts()
        {
            return await _productService.GetAllProducts();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var result = await _productService.GetProduct(id);
            if (result == null)
                return NotFound("Product not found");
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<List<Product>>> Add(Product product)
        {
            return await _productService.AddProduct(product);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Product>>> Update(int id, Product product)
        {
            var result = await _productService.UpdateProduct(id, product);
            if (result == null)
                return NotFound("Product not found");
            return result;
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<List<Product>>> Remove(int id)
        {
            var result = await _productService.RemoveProduct(id);
            if (result == null)
                return NotFound("Product not found");
            return result;
        }

    }
}
