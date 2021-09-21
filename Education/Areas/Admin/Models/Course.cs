using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Education.Admin.Models {
    public class CourseModel {
        public Guid Id { get; set; }

        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [StringLength (60, ErrorMessage = "على الاكثر 60 حرف"), MinLength (3, ErrorMessage = "على الاقل 3 حروف")]
        [Display (Name = "اسم الكورس", Prompt = "اسم الكورس")]
        public string Name { get; set; }

        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [Display (Name = "محتوى الكورس", Prompt = "محتوى الكورس")]
        [MinLength (10, ErrorMessage = "المحتوي يتكون على الاقل من 10 حروف")]
        public string Description { get; set; }

        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [DisplayName (displayName: "هل الكورس متاح الان")]
        public bool IsOpened { get; set; }

        [Display (Name = "تكلفة الاشتراك فى الكورس بالجنية", Prompt = "تكلفة الاشتراك فى الكورس")]
        [DataType (DataType.Currency, ErrorMessage = "هذا المبلغ غير صحيح")]
        [Range (1, 50000, ErrorMessage = "هذا المبلغ غير صحيح")]
        public double? CostOfCourse { get; set; }

        [Display (Name = "تاريخ بداية الكورس", Prompt = "تاريخ بداية الكورس")]
        [DataType (DataType.Date)]
        public DateTime? StartDateOfBegin { get; set; }
        /*public string NotifyStudentsWithCourse { get; set; }*/
        [Display (Name = "المدة التى يستغرقها الكورس", Prompt = "المدة التى يستغرقها الكورس:مثال-مدة الكورس 3 شهور")]
        [DefaultValue ("الفترة غير محددة")]
        public string Period { get; set; }
        /*[Required(ErrorMessage="هذا الحقل مطلوب")]
         public string backgroundImgSrc { get; set; }
        [Required(ErrorMessage="هذا الحقل مطلوب")]
        public string backgroundImgType { get; set; }*/
        /*[Required(ErrorMessage="هذا الحقل مطلوب")]
        public string TeacherId { get; set; }*/
        [Required (ErrorMessage = "هذا الحقل مطلوب")]
        [Display (Name = "القسم", Prompt = "القسم")]
        public Guid CategoryId { get; set; }
    }
    public class CourseBgImage {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public IFormFile Image { get; set; }
    }
}