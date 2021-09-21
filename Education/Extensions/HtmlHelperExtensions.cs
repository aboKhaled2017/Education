using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Education.Student;

namespace Microsoft.AspNetCore.Mvc.ViewFeatures
{
    public static class HtmlHelperExtensions
    {
        public static Tuple<string,string> makeTutorialUrl_main_category(this IHtmlHelper html,object id,string categoryName){
          string url=String.Format("/Tutorial/{0}/{1}",id,categoryName);
          return new Tuple<string,string>(categoryName,url);
        }
        public static Tuple<string,string> makeTutorialUrl_sub_category(this IHtmlHelper html,object id,string categoryName,string subCategoryName){
          string url=String.Format("/Tutorial/{0}/{1}/{2}",id,categoryName,subCategoryName);
          return new Tuple<string,string>(subCategoryName,url);
        }
        public static Tuple<string,string> makeTutorialUrl_subject(this IHtmlHelper html,object id,string categoryName,string subCategoryName,object subjId,string subjName){
          string url=String.Format("/Tutorial/{0}/{1}/{2}/{3}/{4}",id,categoryName,subCategoryName,subjId,subjName);
          return new Tuple<string,string>(subjName,url);
        }
    }
}
