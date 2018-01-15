import { Component } from '@angular/core';
import '!style-loader!css-loader!../../easyui/themes/material/easyui.css';
import '!style-loader!css-loader!../../easyui/themes/angular.css';
import '!style-loader!css-loader!../../easyui/themes/icon.css';

@Component({
    selector: 'org-tree',
    template: `        
        <eui-tree [data]="data" [(selection)]="selection" (selectionChange)="onSelectionChange($event)"></eui-tree>
        <p *ngIf="selection">Selected: {{selection.text}}</p>
    `
})

export class TreeComponent {
    selection: any = null;

    constructor() {}

    data: any[] = [{
        "id":1,
        "text":"华翔能源科技",
        "children":[{
            "id":11,
            "text":"研发部",
            "state":"closed",
            "children":[{
                "id":111,
                "text":"研发后端组"
            },{
                "id":112,
                "text":"研发前端组"
            },{
                "id":113,
                "text":"研发测试组"
            }]
        },{
            "id":12,
            "text":"综合部"
        },{
            "id":13,
            "text":"商务部"
        },{
            "id":14,
            "text":"硬件部"
        }]
    }];

    onSelectionChange(event) : void{
        console.log( event.text );
    }
}
