using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Data.Entities
{
    [Table("course")]
    public partial class Course
    {
        public Course()
        {
            GoinedStudents = new HashSet<StudentCourse>();
            VideosTutorials = new HashSet<VideoTutorial>();
            IsOpened = true;
            NotifyStudentsWithCourse = null;
        }

        [Column("id")]
        public Guid Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(60)]
        public string Name { get; set; }
        [Required]
        [Column("desc")]
        [DataType(DataType.Text)]
        public string Description { get; set; }
        /*[Required]
        [Column("title")]
        [StringLength(100)]
        public string Title { get; set; }*/
        [Column("isOpened")]
        public bool IsOpened { get; set; }
        [Column("cost")]
        [DataType(DataType.Currency)]
        public double? CostOfCourse { get; set; }
        [Column("startDate")]
        public DateTime? StartDateOfBegin { get; set; }
        [Column("notify")]
        public string NotifyStudentsWithCourse { get; set; }
        [Column("period")]
        [StringLength(50,ErrorMessage="لايتعدى 50 حرف")]
        public string Period { get; set; }
        [Column("imgSrc")]
        public string backgroundImgSrc { get; set; }
        [Column("imgType")]
        public string backgroundImgType { get; set; }
        [Column("teacherId")]
        [Required]
        public string TeacherId { get; set; }
        [ForeignKey("TeacherId")]
        [InverseProperty("TeachedCourses")]
        public Teacher Teacher { get; set; }
        [Column("categoryID")]
        [Required]
        public Guid CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        [InverseProperty("Courses")]
        public Category Category { get; set; }
        [InverseProperty("Course")]
        public ICollection<StudentCourse> GoinedStudents { get; set; }
        [InverseProperty("Course")]
        public ICollection<VideoTutorial> VideosTutorials { get; set; }
    }
}
