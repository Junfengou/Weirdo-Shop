﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Weirdo.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }

        //[ForeignKey("Standard")]
        //public virtual string CategoryId { get; set; }
        //public Category Category { get; set; }

    }
}
