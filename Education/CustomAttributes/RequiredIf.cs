
using System;
using System.ComponentModel.DataAnnotations;
 

namespace Education
{
    [AttributeUsage(AttributeTargets.Field|AttributeTargets.Property,AllowMultiple =false,Inherited =true)]
    public class RequiredIf:ValidationAttribute
    {
        RequiredAttribute _innerRequiredAttr = new RequiredAttribute();
        public string _dependentProperty { get; set; }
        public object _targetValue { get; set; }
        public RequiredIf(string dependentProperty,object targetValue)
        {
            _dependentProperty = dependentProperty;
            _targetValue = targetValue;
        }
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var field = validationContext.ObjectType.GetProperty(_dependentProperty);
            if (field != null)
            {
                var dependentValue = field.GetValue(validationContext.ObjectInstance, null);
                if ((dependentValue == null && _targetValue == null) || (dependentValue.Equals(_targetValue)))
                {
                    if (!_innerRequiredAttr.IsValid(value))
                    {
                        string name = validationContext.DisplayName;
                        return new ValidationResult(ErrorMessage="error");
                    }
                }
                return ValidationResult.Success;
            }
            else
            {
                return ValidationResult.Success;
            }
        }
    }
    
}
