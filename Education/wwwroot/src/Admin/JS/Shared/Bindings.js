"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../global/Extensions/JavascriptExt");
var Binding = /** @class */ (function () {
    function Binding(_controller, BindingFormat) {
        if (_controller === void 0) { _controller = ""; }
        var _this = this;
        this._controller = _controller;
        this.BindingFormat = BindingFormat;
        this._ObjectScope = {};
        this._BindingPropRegEx = new RegExp(/\{\{([a-zA-Z_]+)\}\}/);
        this._BindedPropertiesOfFirstTime = [];
        this._AlreadyDefinedProperties = [];
        //get all unique binding properties of elements(ng-bind|ng-model)
        this._BindedPropertiesOfFirstTime =
            $("[ng-controller=" + _controller + "]").find('[ng-bind],[ng-model]').get()
                .map(function (el) { return $(el).attr('ng-bind') || $(el).prop('ng-bind') ||
                $(el).attr('ng-model') || $(el).prop('ng-model'); }).UniqueValues();
        var _loop_1 = function (prop) {
            //set action foreach binding property on set
            this_1.DefineProperty(prop);
            //handle each element is source of binding
            //in most cases this element is input element(has[ng-model property])
            $("[ng-controller=" + _controller + "]").find("[ng-model=" + prop + "]").get().forEach(function (el) {
                var $el = $(el);
                //intialize BindingObject property with the binding source element 
                //that has the binding source property of the same object property 
                _this._ObjectScope[prop] = $el.val();
                //handle the Binding source element change
                $el.change(function (e) {
                    _this._ObjectScope[prop] = $(e.target).val();
                });
                $el.keyup(function (e) {
                    _this._ObjectScope[prop] = $(e.target).val();
                });
            });
        };
        var this_1 = this;
        //foreach binding property do this 
        for (var _i = 0, _a = this._BindedPropertiesOfFirstTime; _i < _a.length; _i++) {
            var prop = _a[_i];
            _loop_1(prop);
        }
    }
    Binding.prototype.GetBindedAttributes = function (BindingPropertyName) {
        var _this = this;
        var BindedAtrrbs = [];
        $("[ng-controller=" + this._controller + "]").find('*').each(function (i, el) {
            var $el = $(el);
            var dataBind = $el.data('bind');
            var _loop_2 = function (attr) {
                var test = _this._BindingPropRegEx.exec($el.attr(attr));
                var dataBindAttr = (dataBind && dataBind.length > 0
                    && dataBind.some(function (e) { return e.Attribute == attr && e.RegExText[1].trim() == BindingPropertyName; }))
                    ? dataBind.find(function (e) { return e.Attribute == attr; }) : null;
                if (test) {
                    if (BindingPropertyName == test[1].trim()) {
                        if (dataBind && dataBind.length > 0) {
                            if (dataBind.some(function (el) { return el.Attribute == attr; }))
                                return "continue";
                            dataBind.push({ Attribute: attr, RegExText: test });
                        }
                        else {
                            $el.data('bind', [{ Attribute: attr, RegExText: test }]);
                        }
                        BindedAtrrbs.push({ el: $el, AttributeName: attr, RegExTest: test });
                    }
                }
                else if (dataBindAttr) {
                    BindedAtrrbs.push({ el: $el, AttributeName: attr, RegExTest: dataBindAttr.RegExText });
                }
            };
            for (var _i = 0, _a = el.getAttributeNames(); _i < _a.length; _i++) {
                var attr = _a[_i];
                _loop_2(attr);
            }
        });
        return BindedAtrrbs;
    };
    Binding.prototype.GetNewllyAddedTargetBindedAttributes = function () {
        var _this = this;
        var attrs = [];
        $("[ng-controller=" + this._controller + "]").find('*').each(function (i, el) {
            var $el = $(el);
            var dataBind = $el.data('bind');
            for (var _i = 0, _a = el.getAttributeNames(); _i < _a.length; _i++) {
                var attr = _a[_i];
                var test = _this._BindingPropRegEx.exec($el.attr(attr));
                if (test) {
                    if (!attrs.includes(test[1].trim()))
                        attrs.push(test[1].trim());
                }
            }
        });
        return attrs;
    };
    Binding.prototype.DefineProperty = function (prop) {
        //check if that property is defined before
        if (this._AlreadyDefinedProperties.includes(prop))
            return;
        this._AlreadyDefinedProperties.push(prop);
        //store instance of this class object to ObjectModel variable
        var ObjectModel = this;
        //set action foreach binding property on set
        Object.defineProperty(this._ObjectScope, prop, {
            get: function () { return this["_" + prop]; },
            //handle on BindingObject property value changes
            set: function (value) {
                this["_" + prop] = value;
                //handle change to every element has the same binding property
                //element can be (input element|text element)
                $("[ng-controller=" + ObjectModel._controller + "]").find("[ng-bind= " + prop + "], [ng-model=" + prop + "]")
                    .get().forEach(function (el) {
                    var $el = $(el);
                    if ($el.is('input') || $el.is('textarea'))
                        $el.val(value);
                    else
                        ObjectModel.BindingFormat ? $el.text(ObjectModel.BindingFormat(value, prop)) : $el.text(value);
                });
                //handle change to each element has the format of {{propertyName}}
                //get al elements contains that format for that propertyName
                ObjectModel.GetBindedAttributes(prop).forEach(function (obj) {
                    obj.el.attr(obj.AttributeName, obj.RegExTest["input"].replace(obj.RegExTest[0], value));
                });
            }
        });
    };
    Binding.prototype.UpdateTheNewllyAddedBinding = function () {
        var _this = this;
        //get all unique binding properties of elements(ng-bind|ng-model)
        var newAddedBindingProperties = $("[ng-controller=" + this._controller + "]").find('[ng-bind],[ng-model]').get()
            .map(function (el) { return $(el).attr('ng-bind') || $(el).prop('ng-bind') ||
            $(el).attr('ng-model') || $(el).prop('ng-model'); })
            .concat(this.GetNewllyAddedTargetBindedAttributes())
            .UniqueValues();
        newAddedBindingProperties.forEach(function (propName) {
            _this.DefineProperty(propName);
        });
    };
    Object.defineProperty(Binding.prototype, "Model", {
        get: function () {
            return this._ObjectScope;
        },
        set: function (model) {
            this._ObjectScope = model;
        },
        enumerable: true,
        configurable: true
    });
    Binding.controller = function (name, callback, BindingFormat) {
        var newBingding = new Binding(name, BindingFormat);
        callback(newBingding._ObjectScope);
        return newBingding;
    };
    return Binding;
}());
exports.Binding = Binding;
//# sourceMappingURL=Bindings.js.map