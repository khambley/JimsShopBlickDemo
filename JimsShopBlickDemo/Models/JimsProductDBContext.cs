using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace JimsShopBlickDemo.Models
{
    public partial class JimsProductDBContext : DbContext
    {
        public JimsProductDBContext()
        {
        }

        public JimsProductDBContext(DbContextOptions<JimsProductDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Buyer> Buyer { get; set; }
        public virtual DbSet<Product> Product { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                //optionsBuilder.UseSqlServer("Data Source=KATHERINE-ALIEN\\SQLEXPRESS;Initial Catalog=JimsProductDB;Integrated Security=True");
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=JimsProductDB;Integrated Security=True;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Buyer>(entity =>
            {
                entity.Property(e => e.BuyerName)
                    .IsRequired()
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.BuyerName)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.ProductDescription)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.ProductImage)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.ProductPrice).HasColumnType("money");

                entity.Property(e => e.ProductTitle)
                    .IsRequired()
                    .IsUnicode(false);
            });
        }
    }
}
