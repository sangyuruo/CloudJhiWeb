import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MultiwaySwitchInfo } from './multiway-switch-info.model';
import { MultiwaySwitchInfoService } from './multiway-switch-info.service';

@Injectable()
export class MultiwaySwitchInfoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private multiwaySwitchInfoService: MultiwaySwitchInfoService

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
                this.multiwaySwitchInfoService.find(id).subscribe((multiwaySwitchInfo) => {
                    multiwaySwitchInfo.createTime = this.datePipe
                        .transform(multiwaySwitchInfo.createTime, 'yyyy-MM-ddTHH:mm:ss');
                    multiwaySwitchInfo.updateTime = this.datePipe
                        .transform(multiwaySwitchInfo.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.multiwaySwitchInfoModalRef(component, multiwaySwitchInfo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.multiwaySwitchInfoModalRef(component, new MultiwaySwitchInfo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    multiwaySwitchInfoModalRef(component: Component, multiwaySwitchInfo: MultiwaySwitchInfo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.multiwaySwitchInfo = multiwaySwitchInfo;
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
