import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { RuleAttributes } from './rule-attributes.model';
import { RuleAttributesService } from './rule-attributes.service';

@Injectable()
export class RuleAttributesPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private ruleAttributesService: RuleAttributesService

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
                this.ruleAttributesService.find(id).subscribe((ruleAttributes) => {
                    ruleAttributes.createTime = this.datePipe
                        .transform(ruleAttributes.createTime, 'yyyy-MM-ddTHH:mm:ss');
                    ruleAttributes.updateTime = this.datePipe
                        .transform(ruleAttributes.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.ruleAttributesModalRef(component, ruleAttributes);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ruleAttributesModalRef(component, new RuleAttributes());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ruleAttributesModalRef(component: Component, ruleAttributes: RuleAttributes): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ruleAttributes = ruleAttributes;
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
