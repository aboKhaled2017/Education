using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Data.Entities
{
    [Table("category")]
    public partial class Category
    {
        public Category()
        {
            SubCategories = new HashSet<Category>();
            GoinedStudents = new HashSet<StudentInfo>();
        }

        [Column("id")]
        public Guid Id { get; set; }
        [Column("name")]
        [StringLength(100)]
        public string Name { get; set; }
        [Column("superid"), DefaultValue(null)]
        public Guid? SuperId { get; set; }
        [Column("isEnabled"), DefaultValue(false)]
        public bool IsEnabled { get; set; }

        [ForeignKey("SuperId")]
        [InverseProperty("SubCategories")]
        public Category SuperCategory { get; set; }
        [InverseProperty("SuperCategory")]
        public ICollection<Category> SubCategories { get; set; }
        [InverseProperty("Category")]
        public ICollection<StudentInfo> GoinedStudents { get; set; }
        [InverseProperty("Category")]
        public ICollection<Course> Courses { get; set; }
    }
}
