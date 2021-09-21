import '../../../global/Extensions/JavascriptExt';
export interface IBinding <T>{
    Model: T,
    UpdateTheNewllyAddedBinding: () => void;
}
interface AttributeBinding {

    Attribute: string,
    RegExText: RegExpExecArray
}
export class Binding<N extends { [key: string]: any }> implements IBinding<N> {
    private _ObjectScope: N = {} as N;
    private _BindingPropRegEx = new RegExp(/\{\{([a-zA-Z_]+)\}\}/);
    private _BindedPropertiesOfFirstTime: string[] = [];
    private _AlreadyDefinedProperties: string[] = [];
    private GetBindedAttributes(BindingPropertyName: string) {
        let BindedAtrrbs: { el: JQuery, AttributeName: string, RegExTest: RegExpExecArray }[] = [];
        $(`[ng-controller=${this._controller}]`).find('*').each((i, el) => {
            let $el = $(el);
            let dataBind = $el.data('bind') as AttributeBinding[];
            for (let attr of el.getAttributeNames()) {
                let test = this._BindingPropRegEx.exec($el.attr(attr) as string);
                let dataBindAttr = (dataBind && dataBind.length > 0
                    && dataBind.some(e => e.Attribute == attr && e.RegExText[1].trim() == BindingPropertyName))
                    ? dataBind.find(e => e.Attribute == attr) : null;
                if (test) {
                    if (BindingPropertyName == test[1].trim()) {                      
                        if (dataBind && dataBind.length > 0) {
                            if (dataBind.some(el => el.Attribute == attr)) continue;
                            dataBind.push({ Attribute: attr, RegExText: test });
                        }
                        else {
                            $el.data('bind', <AttributeBinding[]>[{ Attribute: attr, RegExText:test}]);
                        }
                        BindedAtrrbs.push({ el: $el, AttributeName: attr,RegExTest:test })
                    }
                }
                else if (dataBindAttr) {
                    BindedAtrrbs.push({ el: $el, AttributeName: attr, RegExTest: dataBindAttr.RegExText })
                }
            }
        });
        return BindedAtrrbs;
    }
    private GetNewllyAddedTargetBindedAttributes() {
        let attrs: string[] = [];
        $(`[ng-controller=${this._controller}]`).find('*').each((i, el) => {
            let $el = $(el);
            let dataBind = $el.data('bind') as AttributeBinding[];
            for (let attr of el.getAttributeNames()) {
                let test = this._BindingPropRegEx.exec($el.attr(attr) as string);               
                if (test) {
                    if (!attrs.includes(test[1].trim()))
                    attrs.push(test[1].trim());
                }              
            }
        });
        return attrs;
    }
    private DefineProperty(prop: string) {
        //check if that property is defined before
        if (this._AlreadyDefinedProperties.includes(prop)) return;
        this._AlreadyDefinedProperties.push(prop);
        //store instance of this class object to ObjectModel variable
        let ObjectModel = this;
        //set action foreach binding property on set
        Object.defineProperty(this._ObjectScope, prop, {
            get: function () { return this[`_${prop}`]; },
            //handle on BindingObject property value changes
            set: function (value) {
                this[`_${prop}`] = value;
                //handle change to every element has the same binding property
                //element can be (input element|text element)
                $(`[ng-controller=${ObjectModel._controller}]`).find(`[ng-bind= ${ prop }], [ng-model=${ prop }]`)
                    .get().forEach(el => {
                        let $el = $(el);
                        if ($el.is('input') || $el.is('textarea'))
                            $el.val(value);
                        else ObjectModel.BindingFormat ? $el.text(ObjectModel.BindingFormat(value, prop)) : $el.text(value);
                    });
                //handle change to each element has the format of {{propertyName}}
                //get al elements contains that format for that propertyName
                ObjectModel.GetBindedAttributes(prop).forEach((obj) => {
                    obj.el.attr(obj.AttributeName, obj.RegExTest["input"].replace(obj.RegExTest[0], value));
                });
            }
        });
    }
    private constructor(private _controller: string = "", private BindingFormat?: (value: any, prop: string) => string) {
        //get all unique binding properties of elements(ng-bind|ng-model)
        this._BindedPropertiesOfFirstTime =
             $(`[ng-controller=${_controller}]`).find('[ng-bind],[ng-model]').get()
                .map(el => $(el).attr('ng-bind') || $(el).prop('ng-bind') ||
                    $(el).attr('ng-model') || $(el).prop('ng-model')).UniqueValues();
        //foreach binding property do this 
        for (let prop of this._BindedPropertiesOfFirstTime) {              
            //set action foreach binding property on set
            this.DefineProperty(prop);
            //handle each element is source of binding
            //in most cases this element is input element(has[ng-model property])
            $(`[ng-controller=${_controller}]`).find(`[ng-model=${prop}]`).get().forEach(el => {
                let $el = $(el);
                //intialize BindingObject property with the binding source element 
                //that has the binding source property of the same object property 
                this._ObjectScope[prop] = $el.val();
                //handle the Binding source element change
                    $el.change(e => {
                        this._ObjectScope[prop] = $(e.target).val();
                    })
                     $el.keyup(e => {
                    this._ObjectScope[prop] = $(e.target).val();
                    })
            });       
        }    
    }
    public UpdateTheNewllyAddedBinding() {
        //get all unique binding properties of elements(ng-bind|ng-model)
       let  newAddedBindingProperties =
            $(`[ng-controller=${this._controller}]`).find('[ng-bind],[ng-model]').get()
                .map(el => $(el).attr('ng-bind') || $(el).prop('ng-bind') ||
                   $(el).attr('ng-model') || $(el).prop('ng-model'))
               .concat(this.GetNewllyAddedTargetBindedAttributes())
                .UniqueValues();
        newAddedBindingProperties.forEach(propName => {
            this.DefineProperty(propName)
        });
        

    }
    public get Model() {
        return this._ObjectScope;
    }
    public set Model(model:N) {
        this._ObjectScope = model;
    }
    public static controller<M>(name: string,
        callback: (scope: M) => void, BindingFormat?: (value: any,prop:string) => string) {
        let newBingding = new Binding<M>(name, BindingFormat);
        callback(newBingding._ObjectScope);
        return newBingding;
    }

}
 