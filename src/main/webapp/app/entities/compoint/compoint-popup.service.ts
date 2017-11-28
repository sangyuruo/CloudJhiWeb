import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Compoint } from './compoint.model';
import { CompointService } from './compoint.service';

@Injectable()
export class CompointPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private compointService: CompointService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.compointService.find(id).subscribe((compoint) => {
                    compoint.createTime = this.datePipe
                        .transform(compoint.createTime, 'yyyy-MM-ddTHH:mm:ss');
                    compoint.updateTime = this.datePipe
                        .transform(compoint.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.compointModalRef(component, compoint);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.compointModalRef(component, new Compoint());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    compointModalRef(component: Component, compoint: Compoint): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.compoint = compoint;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
