using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace Education.Admin.Models {
    public class TeacherModel {
        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [RegularExpression ("^(([a-zA-Z]{3,15})\\s{1,3}([a-zA-Z ]{3,15})|([\u0600-\u06FF ]{3,15})\\s{1,3}([\u0600-\u06FF ]{3,15}))$", ErrorMessage = "اسم غير صحيح")]
        [Display (Name = "الاسم")]
        public string Name { get; set; }

        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [Display (Name = "الاسم المهنى")]
        public string Title { get; set; }
    }
}