import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MeterCategoryInfo } from './meter-category-info.model';
import { MeterCategoryInfoPopupService } from './meter-category-info-popup.service';
import { MeterCategoryInfoService } from './meter-category-info.service';

@Component({
    selector: 'jhi-meter-category-info-dialog',
    templateUrl: './meter-category-info-dialog.component.html'
})
export class MeterCategoryInfoDialogComponent implements OnInit {

    meterCategoryInfo: MeterCategoryInfo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private meterCategoryInfoService: MeterCategoryInfoService,
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
        if (this.meterCategoryInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.meterCategoryInfoService.update(this.meterCategoryInfo));
        } else {
            this.subscribeToSaveResponse(
                this.meterCategoryInfoService.create(this.meterCategoryInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<MeterCategoryInfo>) {
        result.subscribe((res: MeterCategoryInfo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MeterCategoryInfo) {
        this.eventManager.broadcast({ name: 'meterCategoryInfoListModification', content: 'OK'});
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
    selector: 'jhi-meter-category-info-popup',
    template: ''
})
export class MeterCategoryInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private meterCategoryInfoPopupService: MeterCategoryInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.meterCategoryInfoPopupService
                    .open(MeterCategoryInfoDialogComponent as Component, params['id']);
            } else {
                this.meterCategoryInfoPopupService
                    .open(MeterCategoryInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
