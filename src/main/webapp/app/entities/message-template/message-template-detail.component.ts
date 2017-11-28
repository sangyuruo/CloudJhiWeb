import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MessageTemplate } from './message-template.model';
import { MessageTemplateService } from './message-template.service';

@Component({
    selector: 'jhi-message-template-detail',
    templateUrl: './message-template-detail.component.html'
})
export class MessageTemplateDetailComponent implements OnInit, OnDestroy {

    messageTemplate: MessageTemplate;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private messageTemplateService: MessageTemplateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMessageTemplates();
    }

    load(id) {
        this.messageTemplateService.find(id).subscribe((messageTemplate) => {
            this.messageTemplate = messageTemplate;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMessageTemplates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'messageTemplateListModification',
            (response) => this.load(this.messageTemplate.id)
        );
    }
}
