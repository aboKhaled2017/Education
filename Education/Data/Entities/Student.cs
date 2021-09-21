using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Data.Entities
{
    [Table("student")]
    public partial class Student
    {
        public Student()
        {
            GoinedCourses = new HashSet<StudentCourse>();
        }

        [Column("id")]
        [Key]
        public string Id { get; set; }
        [Required]
        [Column("fname")]
        [StringLength(30)]
        public string Fname { get; set; }
        [Required]
        [Column("lname")]
        [StringLength(30)]
        public string Lname { get; set; }
        [InverseProperty("Student")]
        public ICollection<StudentCourse> GoinedCourses { get; set; }
    }
}
