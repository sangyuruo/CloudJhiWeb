/**
 * EasyUI for Angular 1.0
 * 
 * Copyright (c) 2009-2018 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import{NgModule}from"@angular/core";import{CommonModule}from"@angular/common";import{DraggableModule}from"../draggable/draggable.module";import{ResizableModule}from"../resizable/resizable.module";import{DialogComponent}from"./dialog.component";var DialogModule=function(){return function(){}}();export{DialogModule};DialogModule.decorators=[{type:NgModule,args:[{declarations:[DialogComponent],imports:[CommonModule,DraggableModule,ResizableModule],exports:[DialogComponent]}]}],DialogModule.ctorParameters=function(){return[]};