import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Compoint } from './compoint.model';
import { CompointPopupService } from './compoint-popup.service';
import { CompointService } from './compoint.service';

@Component({
    selector: 'jhi-compoint-delete-dialog',
    templateUrl: './compoint-delete-dialog.component.html'
})
export class CompointDeleteDialogComponent {

    compoint: Compoint;

    constructor(
        private compointService: CompointService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.compointService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'compointListModification',
                content: 'Deleted an compoint'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-compoint-delete-popup',
    template: ''
})
export class CompointDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private compointPopupService: CompointPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.compointPopupService
                .open(CompointDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
