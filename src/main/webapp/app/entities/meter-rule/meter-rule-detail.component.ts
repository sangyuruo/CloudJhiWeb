import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MeterRule } from './meter-rule.model';
import { MeterRuleService } from './meter-rule.service';

@Component({
    selector: 'jhi-meter-rule-detail',
    templateUrl: './meter-rule-detail.component.html'
})
export class MeterRuleDetailComponent implements OnInit, OnDestroy {

    meterRule: MeterRule;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private meterRuleService: MeterRuleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMeterRules();
    }

    load(id) {
        this.meterRuleService.find(id).subscribe((meterRule) => {
            this.meterRule = meterRule;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMeterRules() {
        this.eventSubscriber = this.eventManager.subscribe(
            'meterRuleListModification',
            (response) => this.load(this.meterRule.id)
        );
    }
}
