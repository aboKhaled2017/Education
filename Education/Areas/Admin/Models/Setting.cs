using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Education.Admin.Models
{
    public class BgImageModel
    {
        public string Value { get; set; }
        public IFormFile Image { get; set; }
        public string Name { get; set; }
    }
}
