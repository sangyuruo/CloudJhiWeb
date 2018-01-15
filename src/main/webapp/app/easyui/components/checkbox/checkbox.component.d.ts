import { ElementRef, EventEmitter } from '@angular/core';
import { ValueAccessorBase } from '../base/value-accessor-base';
export declare const CHECKBOX_TEMPLATE: string;
export declare class CheckboxComponent extends ValueAccessorBase<any> {
    inputRef: ElementRef;
    name: string;
    disabled: boolean;
    inputId: string;
    multiple: boolean;
    checked: boolean;
    checkedChange: EventEmitter<{}>;
    values: any[];
    writeValue(value: any): void;
    onClickButton(event: any): void;
    onChange(event: any): void;
    updateValues(): void;
}
