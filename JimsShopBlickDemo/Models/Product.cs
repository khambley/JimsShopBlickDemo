using System;
using System.Collections.Generic;

namespace JimsShopBlickDemo.Models
{
    public partial class Product
    {
        public int ProductId { get; set; }
        public string ProductImage { get; set; }
        public string ProductName { get; set; }
        public string ProductTitle { get; set; }
        public string ProductDescription { get; set; }
        public decimal ProductPrice { get; set; }
        public string BuyerName { get; set; }
    }
}
