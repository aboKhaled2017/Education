using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Education.Admin.Data
{
    public class CategoryData
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsEnabled { get; set; }
        public int subs { get; set; } //subcategories
    }
    public class SelectCategoryItem
    {
        public Guid Id { get; set; }
        public Guid? SuperId { get; set; }
        public string Name { get; set; }
        public List<Guid> subs { get; set; }
    }
}