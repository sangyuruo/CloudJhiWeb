import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RuleAttributes } from './rule-attributes.model';
import { RuleAttributesPopupService } from './rule-attributes-popup.service';
import { RuleAttributesService } from './rule-attributes.service';
import { AlarmRule, AlarmRuleService } from '../alarm-rule';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rule-attributes-dialog',
    templateUrl: './rule-attributes-dialog.component.html'
})
export class RuleAttributesDialogComponent implements OnInit {

    ruleAttributes: RuleAttributes;
    isSaving: boolean;

    alarmrules: AlarmRule[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ruleAttributesService: RuleAttributesService,
        private alarmRuleService: AlarmRuleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.alarmRuleService.query()
            .subscribe((res: ResponseWrapper) => { this.alarmrules = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ruleAttributes.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ruleAttributesService.update(this.ruleAttributes));
        } else {
            this.subscribeToSaveResponse(
                this.ruleAttributesService.create(this.ruleAttributes));
        }
    }

    private subscribeToSaveResponse(result: Observable<RuleAttributes>) {
        result.subscribe((res: RuleAttributes) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RuleAttributes) {
        this.eventManager.broadcast({ name: 'ruleAttributesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAlarmRuleById(index: number, item: AlarmRule) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rule-attributes-popup',
    template: ''
})
export class RuleAttributesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ruleAttributesPopupService: RuleAttributesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ruleAttributesPopupService
                    .open(RuleAttributesDialogComponent as Component, params['id']);
            } else {
                this.ruleAttributesPopupService
                    .open(RuleAttributesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
