using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Education.Data.Entities;

namespace Education
{
    public static class EFExtentions
    {
        public static IQueryable<Category> mainCategories(this IQueryable<Category> categories)
        {
            return categories.Where(c => c.SuperId == null);
        }
        public static IQueryable<Category> Enabled(this IQueryable<Category> categories)
        {
            return categories.Where(c => c.IsEnabled);
        }
        public static IQueryable<Category> Search(this IQueryable<Category> categories, string value)
        {
            if (value == null) return categories;
            return categories.Where(c => c.Name.Contains(value));
        }
        public static IQueryable<Category> Orderable(this IQueryable<Category> categories, byte colNum, Direction dir)
        {
            return colNum == 0
                ? categories
                : dir == Direction.ASC
                    ? (colNum == 1)
                        ? categories.OrderBy(c => c.Name)
                        : categories.OrderBy(c => c.IsEnabled)
                    : (colNum == 1)
                        ? categories.OrderByDescending(c => c.Name)
                        : categories.OrderByDescending(c => c.IsEnabled);
        }
    }
}
