import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AlarmRule } from './alarm-rule.model';
import { AlarmRulePopupService } from './alarm-rule-popup.service';
import { AlarmRuleService } from './alarm-rule.service';

@Component({
    selector: 'jhi-alarm-rule-delete-dialog',
    templateUrl: './alarm-rule-delete-dialog.component.html'
})
export class AlarmRuleDeleteDialogComponent {

    alarmRule: AlarmRule;

    constructor(
        private alarmRuleService: AlarmRuleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.alarmRuleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'alarmRuleListModification',
                content: 'Deleted an alarmRule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alarm-rule-delete-popup',
    template: ''
})
export class AlarmRuleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alarmRulePopupService: AlarmRulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.alarmRulePopupService
                .open(AlarmRuleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
