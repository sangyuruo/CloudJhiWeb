/**
 * EasyUI for Angular 1.0
 * 
 * Copyright (c) 2009-2018 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import{Directive,ViewContainerRef,Input}from"@angular/core";var TreeGridEditTemplateDirective=function(){function TreeGridEditTemplateDirective(viewContainer){this.viewContainer=viewContainer}return TreeGridEditTemplateDirective.prototype.ngOnInit=function(){this.view=this.viewContainer.createEmbeddedView(this.template,{$implicit:this.column,row:this.row})},TreeGridEditTemplateDirective.prototype.ngOnDestroy=function(){this.view.destroy()},TreeGridEditTemplateDirective}();export{TreeGridEditTemplateDirective};TreeGridEditTemplateDirective.decorators=[{type:Directive,args:[{selector:"[euiTreeGridEditTemplate]"}]}],TreeGridEditTemplateDirective.ctorParameters=function(){return[{type:ViewContainerRef}]},TreeGridEditTemplateDirective.propDecorators={column:[{type:Input}],row:[{type:Input}],template:[{type:Input,args:["euiTreeGridEditTemplate"]}]};