import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Area } from './area.model';
import { AreaPopupService } from './area-popup.service';
import { AreaService } from './area.service';

@Component({
    selector: 'jhi-area-dialog',
    templateUrl: './area-dialog.component.html'
})
export class AreaDialogComponent implements OnInit {

    area: Area;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private areaService: AreaService,
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
        if (this.area.id !== undefined) {
            this.subscribeToSaveResponse(
                this.areaService.update(this.area));
        } else {
            this.subscribeToSaveResponse(
                this.areaService.create(this.area));
        }
    }

    private subscribeToSaveResponse(result: Observable<Area>) {
        result.subscribe((res: Area) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Area) {
        this.eventManager.broadcast({ name: 'areaListModification', content: 'OK'});
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
    selector: 'jhi-area-popup',
    template: ''
})
export class AreaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private areaPopupService: AreaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.areaPopupService
                    .open(AreaDialogComponent as Component, params['id']);
            } else {
                this.areaPopupService
                    .open(AreaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
