using Education.Admin.Data;
using Education.Admin.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Education
{
    public static class ModelHelperExtensions
    {
        public static CourseModel GetCourseModel(this CourseData data)
        {
            return new CourseModel {
                Id=data.Id,
                Name=data.Name,
                Description=data.Description,
                IsOpened=data.IsOpened,
                CategoryId=data.CategoryId,
                CostOfCourse=data.CostOfCourse,
                Period=data.Period,
                StartDateOfBegin=data.StartDateOfBegin
            };
        }
    }
}
