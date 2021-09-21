using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Data.Entities
{
    [Table("teacher")]
    public partial class Teacher
    {
        public Teacher()
        {
            TeachedCourses = new HashSet<Course>();
        }

        [Column("id")]
        [Key]
        public string Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(50)]
        public string Name { get; set; }
        [Column("title")]
        [Required]
        public string Title { get; set; }
        [InverseProperty("Teacher")]
        public ICollection<Course> TeachedCourses { get; set; }
    }
}
