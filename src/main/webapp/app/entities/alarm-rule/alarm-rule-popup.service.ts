import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AlarmRule } from './alarm-rule.model';
import { AlarmRuleService } from './alarm-rule.service';

@Injectable()
export class AlarmRulePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private alarmRuleService: AlarmRuleService

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
                this.alarmRuleService.find(id).subscribe((alarmRule) => {
                    alarmRule.createTime = this.datePipe
                        .transform(alarmRule.createTime, 'yyyy-MM-ddTHH:mm:ss');
                    alarmRule.updateTime = this.datePipe
                        .transform(alarmRule.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.alarmRuleModalRef(component, alarmRule);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.alarmRuleModalRef(component, new AlarmRule());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    alarmRuleModalRef(component: Component, alarmRule: AlarmRule): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.alarmRule = alarmRule;
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
