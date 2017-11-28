import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MeterCategoryInfo } from './meter-category-info.model';
import { MeterCategoryInfoService } from './meter-category-info.service';

@Injectable()
export class MeterCategoryInfoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private meterCategoryInfoService: MeterCategoryInfoService

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
                this.meterCategoryInfoService.find(id).subscribe((meterCategoryInfo) => {
                    meterCategoryInfo.createTime = this.datePipe
                        .transform(meterCategoryInfo.createTime, 'yyyy-MM-ddTHH:mm:ss');
                    meterCategoryInfo.updateTime = this.datePipe
                        .transform(meterCategoryInfo.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.meterCategoryInfoModalRef(component, meterCategoryInfo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.meterCategoryInfoModalRef(component, new MeterCategoryInfo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    meterCategoryInfoModalRef(component: Component, meterCategoryInfo: MeterCategoryInfo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.meterCategoryInfo = meterCategoryInfo;
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
