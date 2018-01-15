/**
 * EasyUI for Angular 1.0
 * 
 * Copyright (c) 2009-2018 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import{NgModule}from"@angular/core";import{CommonModule}from"@angular/common";import{FormsModule}from"@angular/forms";import{BaseModule}from"../base/base.module";import{GridBaseModule}from"../gridbase/grid-base.module";import{PaginationModule}from"../pagination/pagination.module";import{TreeGridComponent}from"./treegrid.component";import{TreeGridBodyComponent}from"./treegrid-body.component";import{TreeGridViewComponent}from"./treegrid-view.component";import{TreeGridRowComponent}from"./treegrid-row.component";import{TreeGridChildrenComponent}from"./treegrid-children.component";import{TreeGridEditTemplateDirective}from"./treegrid-edittemplate.directive";var TreeGridModule=function(){return function(){}}();export{TreeGridModule};TreeGridModule.decorators=[{type:NgModule,args:[{declarations:[TreeGridComponent,TreeGridBodyComponent,TreeGridViewComponent,TreeGridRowComponent,TreeGridChildrenComponent,TreeGridEditTemplateDirective],imports:[CommonModule,FormsModule,BaseModule,GridBaseModule,PaginationModule],exports:[TreeGridComponent,TreeGridBodyComponent,TreeGridViewComponent,TreeGridRowComponent,TreeGridChildrenComponent,TreeGridEditTemplateDirective]}]}],TreeGridModule.ctorParameters=function(){return[]};