import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Compoint } from './compoint.model';
import { CompointPopupService } from './compoint-popup.service';
import { CompointService } from './compoint.service';

@Component({
    selector: 'jhi-compoint-dialog',
    templateUrl: './compoint-dialog.component.html'
})
export class CompointDialogComponent implements OnInit {

    compoint: Compoint;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private compointService: CompointService,
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
        if (this.compoint.id !== undefined) {
            this.subscribeToSaveResponse(
                this.compointService.update(this.compoint));
        } else {
            this.subscribeToSaveResponse(
                this.compointService.create(this.compoint));
        }
    }

    private subscribeToSaveResponse(result: Observable<Compoint>) {
        result.subscribe((res: Compoint) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Compoint) {
        this.eventManager.broadcast({ name: 'compointListModification', content: 'OK'});
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
    selector: 'jhi-compoint-popup',
    template: ''
})
export class CompointPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private compointPopupService: CompointPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.compointPopupService
                    .open(CompointDialogComponent as Component, params['id']);
            } else {
                this.compointPopupService
                    .open(CompointDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
