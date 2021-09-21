using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Education.Admin.Models
{
    public class VideoModel
    {
        public Guid Id { get; set; }
        public Guid CourseId { get; set; }
        [Display(Name = "الرقم التسلسلى للفديو", Prompt = "الرقم التسلسلى للفديو")]
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [Remote(action: "isVideoNumberExists", controller: "VideoTutorial",
         areaName: "Admin", ErrorMessage = "هذا الرقم التسلسى مكرر,استخدم رقم اخر",
         AdditionalFields = "CourseId")]
        public short VideoNumber { get; set; }

        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [Remote(action: "isVideoTitleExists", controller: "VideoTutorial",
         areaName: "Admin", ErrorMessage = "هذا العنوان مكرر,استخدم عنوان اخر",
         AdditionalFields = "CourseId")]
        [StringLength(100, ErrorMessage = "على الاكثر 100 حرف"), MinLength(3, ErrorMessage = "على الاقل 3 حروف")]
        [Display(Name = "عنوان الفديو", Prompt = "عنوان الفديو")]
        public string Title { get; set; }

        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [Display(Name = "وصف محتوى الفديو", Prompt = "وصف محتوى الفديو")]
        [MinLength(10, ErrorMessage = "المحتوي يتكون على الاقل من 10 حروف")]
        public string Description { get; set; }

        [DisplayName(displayName: "موقع تخزين ملف الفديو")]
        public bool IsYoutube { get; set; } = false;

        [Display(Name = "مدة الفديو بالثوانى", Prompt = "مدة الفديو بالثوانى")]
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        public int Duration { get; set; }

        [Required(ErrorMessage = "من فضلك اضغط لتحميل ملف الفديو")]
        // [RequiredIf("IsYoutube", false, ErrorMessage = "تحميل الفديو مطلوب")]
        [Display(Name = "تحميل ملف الفديو", Prompt = "تحميل ملف الفديو")]
        [DataType(DataType.Upload)]
        public IFormFile Video { get; set; }

        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        //[RequiredIf("IsYoutube",true,ErrorMessage ="رابط الفديو مطلوب")]
        [DataType(DataType.Url, ErrorMessage = "هذا الرابط غير صحيح")]
        [Display(Name = "رابط الفديو على اليوتيوب", Prompt = "رابط الفديو على اليوتيوب")]
        public string Url { get; set; }
    }
    public class VideoModel_Edit
    {
        public Guid Id_Edit { get; set; }
        public Guid CourseId_Edit { get; set; }
        public bool IsVideoChanged { get; set; } = false;
        [Display(Name = "الرقم التسلسلى للفديو", Prompt = "الرقم التسلسلى للفديو")]
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [Remote(action: "isVideoNumberExists_Edit", controller: "VideoTutorial",
         areaName: "Admin", ErrorMessage = "هذا الرقم التسلسى مكرر,استخدم رقم اخر",
         AdditionalFields = "CourseId_Edit,Id_Edit")]
        public short VideoNumber_Edit { get; set; }

        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [Remote(action: "isVideoTitleExists_Edit", controller: "VideoTutorial",
         areaName: "Admin", ErrorMessage = "هذا العنوان مكرر,استخدم عنوان اخر",
         AdditionalFields = "CourseId_Edit,Id_Edit")]
        [StringLength(100, ErrorMessage = "على الاكثر 100 حرف"), MinLength(3, ErrorMessage = "على الاقل 3 حروف")]
        [Display(Name = "عنوان الفديو", Prompt = "عنوان الفديو")]
        public string Title_Edit { get; set; }

        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [Display(Name = "وصف محتوى الفديو", Prompt = "وصف محتوى الفديو")]
        [MinLength(10, ErrorMessage = "المحتوي يتكون على الاقل من 10 حروف")]
        public string Description_Edit { get; set; }

        [DisplayName(displayName: "موقع تخزين ملف الفديو")]
        public bool IsYoutube_Edit { get; set; } = false;

        [Display(Name = "مدة الفديو بالثوانى", Prompt = "مدة الفديو بالثوانى")]
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        public int Duration_Edit { get; set; }
        // [RequiredIf("IsYoutube", false, ErrorMessage = "تحميل الفديو مطلوب")]
        [Display(Name = "تغيير ملف الفديو", Prompt = "تغيير ملف الفديو")]
        [DataType(DataType.Upload)]
        public IFormFile Video_Edit { get; set; }

        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        //[RequiredIf("IsYoutube",true,ErrorMessage ="رابط الفديو مطلوب")]
        [DataType(DataType.Url, ErrorMessage = "هذا الرابط غير صحيح")]
        [Display(Name = "رابط الفديو على اليوتيوب", Prompt = "رابط الفديو على اليوتيوب")]
        public string Url_Edit { get; set; }
    }
}