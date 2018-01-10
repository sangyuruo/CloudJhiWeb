import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MeterRule } from './meter-rule.model';
import { MeterRulePopupService } from './meter-rule-popup.service';
import { MeterRuleService } from './meter-rule.service';

@Component({
    selector: 'jhi-meter-rule-delete-dialog',
    templateUrl: './meter-rule-delete-dialog.component.html'
})
export class MeterRuleDeleteDialogComponent {

    meterRule: MeterRule;

    constructor(
        private meterRuleService: MeterRuleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.meterRuleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'meterRuleListModification',
                content: 'Deleted an meterRule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meter-rule-delete-popup',
    template: ''
})
export class MeterRuleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private meterRulePopupService: MeterRulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.meterRulePopupService
                .open(MeterRuleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
