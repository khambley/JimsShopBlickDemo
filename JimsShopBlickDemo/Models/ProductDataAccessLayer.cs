using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JimsShopBlickDemo.Models
{
    public class ProductDataAccessLayer
    {
        JimsProductDBContext db = new JimsProductDBContext();

        //Gets a product list
        public IEnumerable<Product> GetAllProducts()
        {
            try
            {
                return db.Product.ToList();
            }
            catch
            {
                throw;
            }
        }

        //Creates a product in db
        public int CreateProduct(Product product)
        {
            try
            {
                db.Product.Add(product);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Updates a product record
        public int UpdateProduct(Product product)
        {
            try
            {
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Gets a product details
        public Product GetProductDetails(int id)
        {
            try
            {
                Product product = db.Product.Find(id);
                return product;
            }
            catch
            {
                throw;
            }
        }

        //Deletes a product from db
        public int DeleteProduct(int id)
        {
            try
            {
                Product prod = db.Product.Find(id);
                db.Product.Remove(prod);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Gets a list of buyers from db
        public List<Buyer> GetBuyers()
        {
            List<Buyer> listBuyers = new List<Buyer>();
            listBuyers = (from BuyerList in db.Buyer select BuyerList).ToList();
            return listBuyers;
        }
    }
}
