using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Education.Admin.Models
{
    public class CategoryModel
    {
        public byte Id { get; set; }
        [Required(ErrorMessage = "هذا الحقل مطلوب")]
        public bool IsEnabled { get; set; }
        [StringLength(100,MinimumLength =3, ErrorMessage = "الاسم غير صحيح")]
        [Required(ErrorMessage ="هذا الحقل مطلوب")]
        public string Name { get; set; }
    }
}
