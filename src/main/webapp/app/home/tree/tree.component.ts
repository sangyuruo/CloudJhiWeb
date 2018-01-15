import { Component } from '@angular/core';
import '!style-loader!css-loader!../../easyui/themes/material/easyui.css';
import '!style-loader!css-loader!../../easyui/themes/angular.css';
import '!style-loader!css-loader!../../easyui/themes/icon.css';

@Component({
    selector: 'orgs-tree',
    template: `
        <h2>Basic Tree</h2>
        <eui-tree [data]="data" [(selection)]="selection"></eui-tree>
        <p *ngIf="selection">Selected: {{selection.text}}</p>
    `
})

export class TreeComponent {
    selection: any = null;
    data: any[] = [{
        "id":1,
        "text":"My Documents",
        "children":[{
            "id":11,
            "text":"Photos",
            "state":"closed",
            "children":[{
                "id":111,
                "text":"Friend"
            },{
                "id":112,
                "text":"Wife"
            },{
                "id":113,
                "text":"Company"
            }]
        },{
            "id":12,
            "text":"Program Files",
            "children":[{
                "id":121,
                "text":"Intel"
            },{
                "id":122,
                "text":"Java"
            },{
                "id":123,
                "text":"Microsoft Office"
            },{
                "id":124,
                "text":"Games"
            }]
        },{
            "id":13,
            "text":"index.html"
        },{
            "id":14,
            "text":"about.html"
        },{
            "id":15,
            "text":"welcome.html"
        }]
    }];
}
