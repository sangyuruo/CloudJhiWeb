import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MessageTemplate } from './message-template.model';
import { MessageTemplateService } from './message-template.service';

@Injectable()
export class MessageTemplatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private messageTemplateService: MessageTemplateService

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
                this.messageTemplateService.find(id).subscribe((messageTemplate) => {
                    messageTemplate.createTime = this.datePipe
                        .transform(messageTemplate.createTime, 'yyyy-MM-ddTHH:mm:ss');
                    messageTemplate.updateTime = this.datePipe
                        .transform(messageTemplate.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.messageTemplateModalRef(component, messageTemplate);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.messageTemplateModalRef(component, new MessageTemplate());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    messageTemplateModalRef(component: Component, messageTemplate: MessageTemplate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.messageTemplate = messageTemplate;
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
