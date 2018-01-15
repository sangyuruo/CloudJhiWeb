import { EventEmitter } from '@angular/core';
import { LinkButtonComponent } from '../linkbutton/linkbutton.component';
export declare const FILEBUTTON_TEMPLATE: string;
export declare class FileButtonComponent extends LinkButtonComponent {
    href: string;
    fileId: string;
    name: string;
    accept: string;
    capture: string;
    multiple: boolean;
    url: string;
    method: string;
    autoUpload: boolean;
    withCredentials: boolean;
    select: EventEmitter<{}>;
    progress: EventEmitter<{}>;
    success: EventEmitter<{}>;
    error: EventEmitter<{}>;
    files: File[];
    onFileSelect(event: any): void;
    upload(): void;
    static fileId: number;
}
