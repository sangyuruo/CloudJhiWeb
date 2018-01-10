import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { RuleAttributes } from './rule-attributes.model';
import { RuleAttributesService } from './rule-attributes.service';

@Component({
    selector: 'jhi-rule-attributes-detail',
    templateUrl: './rule-attributes-detail.component.html'
})
export class RuleAttributesDetailComponent implements OnInit, OnDestroy {

    ruleAttributes: RuleAttributes;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ruleAttributesService: RuleAttributesService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRuleAttributes();
    }

    load(id) {
        this.ruleAttributesService.find(id).subscribe((ruleAttributes) => {
            this.ruleAttributes = ruleAttributes;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRuleAttributes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ruleAttributesListModification',
            (response) => this.load(this.ruleAttributes.id)
        );
    }
}
