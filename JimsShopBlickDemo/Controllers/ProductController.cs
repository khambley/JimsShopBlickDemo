using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using JimsShopBlickDemo.Models;
using System.IO;

namespace JimsShopBlickDemo.Controllers
{
    
    public class ProductController : Controller
    {
        private readonly IHostingEnvironment _env;

        public ProductController(IHostingEnvironment env)
        {
            _env = env;
        }

        ProductDataAccessLayer objProduct = new ProductDataAccessLayer();

        [HttpGet]
        [Route("api/Product/Index")]
        public IEnumerable<Product> Index()
        {
            return objProduct.GetAllProducts();
        }

        [HttpPost]
        [Route("api/Product/Create")]
        public int Create(Product product, IFormFile file)
        {
            return objProduct.CreateProduct(product);
        }

        [HttpGet]
        [Route("api/Product/Details/{id}")]
        public Product Details(int id)
        {
            return objProduct.GetProductDetails(id);
        }

        [HttpPut]
        [Route("api/Product/Edit")]
        public int Edit(Product product)
        {
            return objProduct.UpdateProduct(product);
        }

        [HttpDelete]
        [Route("api/Product/Delete/{id}")]
        public int Delete(int id)
        {
            return objProduct.DeleteProduct(id);
        }

        [HttpGet]
        [Route("api/Product/GetBuyerList")]
        public IEnumerable<Buyer> Details()
        {
            return objProduct.GetBuyers();
        }
        [HttpPost]
        [Route("api/Product/Upload")]
        public async Task<IActionResult> Upload(FileUpload fileUpload)
        {
            var file = fileUpload.File;
            
            if(file.Length > 0)
            {
                string path = Path.Combine(_env.WebRootPath, "images");
                using (var fs = new FileStream(Path.Combine(path, file.FileName), FileMode.Create))
                {
                    await file.CopyToAsync(fs);
                }

                fileUpload.Source = $"images{file.FileName}";
                fileUpload.Extension = Path.GetExtension(file.FileName).Substring(1);
            }
            return BadRequest();
        }
    }
}