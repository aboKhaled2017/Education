using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Education.Data.Entities
{
    public partial class EduEntities : DbContext
    {
        public EduEntities()
        {
        }

        public EduEntities(DbContextOptions<EduEntities> options)
            : base(options)
        {
        }

        public virtual DbSet<Adminer> Admins { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<StudentCourse> StudentCourses { get; set; }
        public virtual DbSet<StudentInfo> StudentInfos { get; set; }
        public virtual DbSet<Teacher> Teachers { get; set; }
        public virtual DbSet<VideoTutorial> VideoTutorials { get; set; }
        public virtual DbSet<Setting> Settings { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StudentCourse>().HasKey(t => new { t.CourseId, t.StudentId });
            modelBuilder.Entity<StudentInfo>(stdInfo =>
            {
                stdInfo.HasOne<Category>("Category")
                .WithMany(cat => cat.GoinedStudents)
                .OnDelete(DeleteBehavior.SetNull);
            });
        }
    }
}
