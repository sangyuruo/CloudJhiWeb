import {Component} from '@angular/core';
import '!style-loader!css-loader!../../easyui/themes/material/easyui.css';
import '!style-loader!css-loader!../../easyui/themes/angular.css';
import '!style-loader!css-loader!../../easyui/themes/icon.css';
import {OrganizationService} from "../../entities/organization/organization.service";

@Component({
    selector: 'org-tree',
    template: `
        <eui-tree [data]="data" [(selection)]="selection" (selectionChange)="onSelectionChange($event)"
                  (nodeExpand)="onNodeExpand($event)"></eui-tree>
        <p *ngIf="selection">Selected: {{selection.text}}</p>
    `
})

export class TreeComponent {
    selection: any = null;
    data: any[] = [{
        "id": 0,
        "text": "华翔能源科技",
        "companyCode":"hx001",
        "state": "closed"
    }];

    constructor(private organizationService: OrganizationService,) {
        //this.organizationService.query().subscribe(res=>this.data=res);

    }


    onSelectionChange(event): void {
        console.log(event.id);
        console.log(event.orgCode);
    }

    onNodeExpand(event) {
        let node = event;
        console.log(event.orgCode);
        if (node.id == 0 && !node.children) {
            this.organizationService.queryByCompanyCode(event.companyCode).subscribe((data) => node.children = data );
        }
    }
}
