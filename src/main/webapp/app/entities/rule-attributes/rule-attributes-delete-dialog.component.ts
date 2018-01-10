import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RuleAttributes } from './rule-attributes.model';
import { RuleAttributesPopupService } from './rule-attributes-popup.service';
import { RuleAttributesService } from './rule-attributes.service';

@Component({
    selector: 'jhi-rule-attributes-delete-dialog',
    templateUrl: './rule-attributes-delete-dialog.component.html'
})
export class RuleAttributesDeleteDialogComponent {

    ruleAttributes: RuleAttributes;

    constructor(
        private ruleAttributesService: RuleAttributesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ruleAttributesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ruleAttributesListModification',
                content: 'Deleted an ruleAttributes'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rule-attributes-delete-popup',
    template: ''
})
export class RuleAttributesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ruleAttributesPopupService: RuleAttributesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ruleAttributesPopupService
                .open(RuleAttributesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
