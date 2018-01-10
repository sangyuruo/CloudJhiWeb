import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MeterRule } from './meter-rule.model';
import { MeterRuleService } from './meter-rule.service';

@Injectable()
export class MeterRulePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private meterRuleService: MeterRuleService

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
                this.meterRuleService.find(id).subscribe((meterRule) => {
                    meterRule.createTime = this.datePipe
                        .transform(meterRule.createTime, 'yyyy-MM-ddTHH:mm:ss');
                    meterRule.updateTime = this.datePipe
                        .transform(meterRule.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.meterRuleModalRef(component, meterRule);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.meterRuleModalRef(component, new MeterRule());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    meterRuleModalRef(component: Component, meterRule: MeterRule): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.meterRule = meterRule;
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
