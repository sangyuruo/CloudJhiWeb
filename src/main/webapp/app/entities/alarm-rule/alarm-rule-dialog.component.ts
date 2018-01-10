import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AlarmRule } from './alarm-rule.model';
import { AlarmRulePopupService } from './alarm-rule-popup.service';
import { AlarmRuleService } from './alarm-rule.service';

@Component({
    selector: 'jhi-alarm-rule-dialog',
    templateUrl: './alarm-rule-dialog.component.html'
})
export class AlarmRuleDialogComponent implements OnInit {

    alarmRule: AlarmRule;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private alarmRuleService: AlarmRuleService,
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
        if (this.alarmRule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.alarmRuleService.update(this.alarmRule));
        } else {
            this.subscribeToSaveResponse(
                this.alarmRuleService.create(this.alarmRule));
        }
    }

    private subscribeToSaveResponse(result: Observable<AlarmRule>) {
        result.subscribe((res: AlarmRule) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AlarmRule) {
        this.eventManager.broadcast({ name: 'alarmRuleListModification', content: 'OK'});
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
    selector: 'jhi-alarm-rule-popup',
    template: ''
})
export class AlarmRulePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alarmRulePopupService: AlarmRulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.alarmRulePopupService
                    .open(AlarmRuleDialogComponent as Component, params['id']);
            } else {
                this.alarmRulePopupService
                    .open(AlarmRuleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
