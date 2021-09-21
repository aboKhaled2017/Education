using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Education.Admin.Data
{
    public class CourseData
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Period { get; set; } = null;
        public bool IsOpened { get; set; }
        public double? CostOfCourse { get; set; }
        public DateTime? StartDateOfBegin { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string backgroundImgSrc { get; set; }
        public int VideosCount { get; set; }
    }
}