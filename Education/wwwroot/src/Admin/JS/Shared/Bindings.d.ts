import '../../../global/Extensions/JavascriptExt';
export interface IBinding<T> {
    Model: T;
    UpdateTheNewllyAddedBinding: () => void;
}
export declare class Binding<N extends {
    [key: string]: any;
}> implements IBinding<N> {
    private _controller;
    private BindingFormat?;
    private _ObjectScope;
    private _BindingPropRegEx;
    private _BindedPropertiesOfFirstTime;
    private _AlreadyDefinedProperties;
    private GetBindedAttributes;
    private GetNewllyAddedTargetBindedAttributes;
    private DefineProperty;
    private constructor();
    UpdateTheNewllyAddedBinding(): void;
    Model: N;
    static controller<M>(name: string, callback: (scope: M) => void, BindingFormat?: (value: any, prop: string) => string): Binding<M>;
}
//# sourceMappingURL=Bindings.d.ts.map