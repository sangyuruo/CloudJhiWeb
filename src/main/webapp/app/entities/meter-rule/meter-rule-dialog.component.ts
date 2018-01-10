import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MeterRule } from './meter-rule.model';
import { MeterRulePopupService } from './meter-rule-popup.service';
import { MeterRuleService } from './meter-rule.service';

@Component({
    selector: 'jhi-meter-rule-dialog',
    templateUrl: './meter-rule-dialog.component.html'
})
export class MeterRuleDialogComponent implements OnInit {

    meterRule: MeterRule;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private meterRuleService: MeterRuleService,
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
        if (this.meterRule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.meterRuleService.update(this.meterRule));
        } else {
            this.subscribeToSaveResponse(
                this.meterRuleService.create(this.meterRule));
        }
    }

    private subscribeToSaveResponse(result: Observable<MeterRule>) {
        result.subscribe((res: MeterRule) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MeterRule) {
        this.eventManager.broadcast({ name: 'meterRuleListModification', content: 'OK'});
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
    selector: 'jhi-meter-rule-popup',
    template: ''
})
export class MeterRulePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private meterRulePopupService: MeterRulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.meterRulePopupService
                    .open(MeterRuleDialogComponent as Component, params['id']);
            } else {
                this.meterRulePopupService
                    .open(MeterRuleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
