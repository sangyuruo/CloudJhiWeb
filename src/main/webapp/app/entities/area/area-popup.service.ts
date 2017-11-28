import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Area } from './area.model';
import { AreaService } from './area.service';

@Injectable()
export class AreaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private areaService: AreaService

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
                this.areaService.find(id).subscribe((area) => {
                    area.createTime = this.datePipe
                        .transform(area.createTime, 'yyyy-MM-ddTHH:mm:ss');
                    area.updateTime = this.datePipe
                        .transform(area.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.areaModalRef(component, area);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.areaModalRef(component, new Area());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    areaModalRef(component: Component, area: Area): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.area = area;
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
