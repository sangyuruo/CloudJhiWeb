import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MessageTemplate } from './message-template.model';
import { MessageTemplatePopupService } from './message-template-popup.service';
import { MessageTemplateService } from './message-template.service';

@Component({
    selector: 'jhi-message-template-dialog',
    templateUrl: './message-template-dialog.component.html'
})
export class MessageTemplateDialogComponent implements OnInit {

    messageTemplate: MessageTemplate;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private messageTemplateService: MessageTemplateService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.messageTemplate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.messageTemplateService.update(this.messageTemplate));
        } else {
            this.subscribeToSaveResponse(
                this.messageTemplateService.create(this.messageTemplate));
        }
    }

    private subscribeToSaveResponse(result: Observable<MessageTemplate>) {
        result.subscribe((res: MessageTemplate) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MessageTemplate) {
        this.eventManager.broadcast({ name: 'messageTemplateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-message-template-popup',
    template: ''
})
export class MessageTemplatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private messageTemplatePopupService: MessageTemplatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.messageTemplatePopupService
                    .open(MessageTemplateDialogComponent as Component, params['id']);
            } else {
                this.messageTemplatePopupService
                    .open(MessageTemplateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
