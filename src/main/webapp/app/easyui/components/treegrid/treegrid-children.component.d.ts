import { TreeGridComponent } from './treegrid.component';
import { TreeGridBodyComponent } from './treegrid-body.component';
export declare class TreeGridChildrenComponent {
    gridBody: TreeGridBodyComponent;
    rows: any[];
    prow: any;
    columns: any;
    depth: number;
    grid: TreeGridComponent;
    constructor(gridBody: TreeGridBodyComponent);
    onRowClick(row: any, event: any): void;
    onRowDblClick(row: any, event: any): void;
    onRowContextMenu(row: any, event: any): void;
}
