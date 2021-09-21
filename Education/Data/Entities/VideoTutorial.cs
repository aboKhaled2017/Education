using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Data.Entities
{
    [Table("videoTutorial")]
    public partial class VideoTutorial
    {
        public VideoTutorial()
        {
            Duration = 0;
            IsYoutube = false;
            Date = DateTime.Now;
        }
        [Column("id")]
        [Key]
        public Guid Id { get; set; }
        [Required]
        [Column("url")]
        public string Url { get; set; }
        [Required]
        [Column("title")]
        public string Title { get; set; }
        [Required]
        [Column("description")]
        public string Description { get; set; }
        [Required]
        [Column("duration")]
        public int Duration { get; set; }
        [Required]
        [Column("isYoutube")]
        public bool IsYoutube { get; set; }
        [Column("number")]
        public short Number { get; set; }
        [Column("date", TypeName = "date")]
        public DateTime Date { get; set; }
        [Column("courseId")]
        [Required]
        public Guid CourseId { get; set; }
        [ForeignKey("CourseId")]
        [InverseProperty("VideosTutorials")]
        public Course Course { get; set; }
    }
}
