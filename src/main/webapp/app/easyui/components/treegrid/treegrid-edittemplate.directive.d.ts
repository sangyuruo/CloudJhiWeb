import { TemplateRef, ViewContainerRef, EmbeddedViewRef } from '@angular/core';
export declare class TreeGridEditTemplateDirective {
    viewContainer: ViewContainerRef;
    column: any;
    row: any;
    template: TemplateRef<any>;
    view: EmbeddedViewRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
