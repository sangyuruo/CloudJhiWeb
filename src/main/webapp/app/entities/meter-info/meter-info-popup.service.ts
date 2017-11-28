import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MeterInfo } from './meter-info.model';
import { MeterInfoService } from './meter-info.service';

@Injectable()
export class MeterInfoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private meterInfoService: MeterInfoService

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
                this.meterInfoService.find(id).subscribe((meterInfo) => {
                    meterInfo.createTime = this.datePipe
                        .transform(meterInfo.createTime, 'yyyy-MM-ddTHH:mm:ss');
                    meterInfo.updateTime = this.datePipe
                        .transform(meterInfo.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.meterInfoModalRef(component, meterInfo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.meterInfoModalRef(component, new MeterInfo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    meterInfoModalRef(component: Component, meterInfo: MeterInfo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.meterInfo = meterInfo;
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
