using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Education.Data.Entities;
namespace Education
{
    public abstract class Variables
    {
        public static class SettingsTable
        {
            public static string BackgroundImages { get { return "BgImgs"; } }
        }
        public static string BackgroundImagesPath { get { return @"images\Student\backgrounds\"; } }
        public static string BackgroundCoursesImagesPath { get { return @"images\admin\courses\"; } }
        public static string VideoTutorialsPath { get { return @"videos\Tutorials\"; } }
        public enum ResquestStatus
        {
            Error,
            NotFound,
            NoMean,
        }
    }
}
