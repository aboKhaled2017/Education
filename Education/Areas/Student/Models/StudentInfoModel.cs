using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Education.Student
{
    public class StudentMembership
    {
        public string Id { get; set; }
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [StringLength(100, MinimumLength = 10, ErrorMessage = "اسم المدرسة على الاقل {1} حروف وعلى الاكثر {2} حرف")]
        public string School { get; set; }
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [StringLength(50)]
        [RegularExpression("^((\\s?([a-zA-Z]){3,15}(\\s([a-zA-Z]){3,15}){2})|(\\s?([\u0600-\u06FF]){3,15}(\\s([\u0600-\u06FF]){3,15}){2}))$", ErrorMessage = "ادخل اسم صحيح")]
        public string FullName { get; set; }
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [DataType(DataType.PhoneNumber)]
        [Phone]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "رقم الهاتف غير صحيح")]
        public string Phone { get; set; }
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [DataType(DataType.Date)]
        public DateTime BirthDate { get; set; }
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [StringLength(50, MinimumLength = 6, ErrorMessage = "تعبير غير صحيح")]
        public string FatherWork { get; set; }
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        [DataType(DataType.PhoneNumber)]
        [Phone]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "رقم الهاتف غير صحيح")]
        public string FatherPhone { get; set; }
    }
}