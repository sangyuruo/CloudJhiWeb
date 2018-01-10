import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AlarmRule } from './alarm-rule.model';
import { AlarmRuleService } from './alarm-rule.service';

@Component({
    selector: 'jhi-alarm-rule-detail',
    templateUrl: './alarm-rule-detail.component.html'
})
export class AlarmRuleDetailComponent implements OnInit, OnDestroy {

    alarmRule: AlarmRule;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private alarmRuleService: AlarmRuleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAlarmRules();
    }

    load(id) {
        this.alarmRuleService.find(id).subscribe((alarmRule) => {
            this.alarmRule = alarmRule;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAlarmRules() {
        this.eventSubscriber = this.eventManager.subscribe(
            'alarmRuleListModification',
            (response) => this.load(this.alarmRule.id)
        );
    }
}
