using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Education.Data.Entities
{
    [Table("setting")]
    public partial class Setting
    {
        [Column("key"), Key]
        public string Key { get; set; }
        [Column("value"), DataType(DataType.Text)]
        public string Value { get; set; }
    }
}
