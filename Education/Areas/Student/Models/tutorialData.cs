using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Education.Student
{
    public class CategoryData
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
    public class SubjectData
    {
        public Guid Id { get; set; }
        public string mainCategory { get; set; }
        public string subCategory { get; set; }
        public Guid subjId { get; set; }
        public string subjName { get; set; }
    }
    public class FullCategoryData
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<CategoryData> subCategories { get; set; }

    }
}