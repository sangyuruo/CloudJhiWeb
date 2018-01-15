import { ElementRef } from '@angular/core';
import { ValueAccessorBase } from '../base/value-accessor-base';
export declare const RADIOBUTTON_TEMPLATE: string;
export declare class RadioButtonComponent extends ValueAccessorBase<any> {
    inputRef: ElementRef;
    name: string;
    disabled: boolean;
    inputId: string;
    readonly checked: any;
    writeValue(value: any): void;
    onClickButton(event: any): void;
    onChange(event: any): void;
    select(): void;
}
