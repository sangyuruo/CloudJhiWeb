import { TreeGridComponent } from './treegrid.component';
import { TreeGridBodyComponent } from './treegrid-body.component';
export declare class TreeGridRowComponent {
    gridBody: TreeGridBodyComponent;
    row: any;
    prow: any;
    columns: any;
    depth: number;
    rowIndex: number;
    loading: boolean;
    grid: TreeGridComponent;
    readonly indentWidth: number;
    readonly checkboxClass: string;
    isTreeField(field: string): boolean;
    isExpanded(): boolean;
    isCollapsed(): boolean;
    isLeaf(): boolean;
    constructor(gridBody: TreeGridBodyComponent);
    ngOnInit(): void;
    toggle(event: any): void;
    onCheckRow(event: any): void;
    onCellClick(col: any, event: any): void;
    onCellDblClick(col: any, event: any): void;
    onCellContextMenu(col: any, event: any): void;
    onCellKeyDown(col: any, event: any): void;
    doEdit(col: any, target: any): void;
    isEditable(col: any): boolean;
}
