import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { NotifyLog } from './notify-log.model';
import { NotifyLogService } from './notify-log.service';

@Injectable()
export class NotifyLogPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private notifyLogService: NotifyLogService

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
                this.notifyLogService.find(id).subscribe((notifyLog) => {
                    notifyLog.createTime = this.datePipe
                        .transform(notifyLog.createTime, 'yyyy-MM-ddTHH:mm:ss');
                    notifyLog.updateTime = this.datePipe
                        .transform(notifyLog.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.notifyLogModalRef(component, notifyLog);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.notifyLogModalRef(component, new NotifyLog());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    notifyLogModalRef(component: Component, notifyLog: NotifyLog): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.notifyLog = notifyLog;
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
