using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Data.Entities
{
    [Table("studentCourse")]
    public partial class StudentCourse
    {
        public StudentCourse()
        {
            Status = StudentCourseRegisterType.Pending;
        }
        [Column("studentId", Order = 0)]
        [Key]
        public string StudentId { get; set; }
        [Column("courseId", Order = 1)]
        [Key]
        public Guid CourseId { get; set; }
        [Column("status")]
        public StudentCourseRegisterType Status { get; set; }
        [Column("regDate")]
        public DateTime RegisterDate { get; set; }
        [ForeignKey("CourseId")]
        [InverseProperty("GoinedStudents")]
        public Course Course { get; set; }
        [ForeignKey("StudentId")]
        [InverseProperty("GoinedCourses")]
        public Student Student { get; set; }
    }
}
