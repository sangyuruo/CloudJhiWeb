import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MessageTemplate } from './message-template.model';
import { MessageTemplatePopupService } from './message-template-popup.service';
import { MessageTemplateService } from './message-template.service';

@Component({
    selector: 'jhi-message-template-delete-dialog',
    templateUrl: './message-template-delete-dialog.component.html'
})
export class MessageTemplateDeleteDialogComponent {

    messageTemplate: MessageTemplate;

    constructor(
        private messageTemplateService: MessageTemplateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.messageTemplateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'messageTemplateListModification',
                content: 'Deleted an messageTemplate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-message-template-delete-popup',
    template: ''
})
export class MessageTemplateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private messageTemplatePopupService: MessageTemplatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.messageTemplatePopupService
                .open(MessageTemplateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
