using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Data.Entities
{
    [Table("studentInfo")]
    public partial class StudentInfo
    {
        [Key, Column("id")]
        public string StudentId { get; set; }
        [Required]
        [Column("school")]
        [StringLength(100)]
        public string School { get; set; }
        [Required]
        [Column("fullName")]
        [StringLength(50)]
        public string FullName { get; set; }
        [Required]
        [Column("phone")]
        [StringLength(11)]
        public string Phone { get; set; }
        [Column("birthDate", TypeName = "date")]
        public DateTime BirthDate { get; set; }
        [Required]
        [Column("fatherWork")]
        [StringLength(50)]
        public string FatherWork { get; set; }
        [Required]
        [Column("fatherPhone")]
        [StringLength(11)]
        public string FatherPhone { get; set; }
        [Column("categoryID")]
        public Guid? CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        [InverseProperty("GoinedStudents")]
        public Category Category { get; set; }
        [ForeignKey("StudentId")]
        public Student Student { get; set; }
    }
}
