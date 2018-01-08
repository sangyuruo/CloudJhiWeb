import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MeterInfo } from './meter-info.model';
import { MeterInfoPopupService } from './meter-info-popup.service';
import { MeterInfoService } from './meter-info.service';
import { MeterCategoryInfo, MeterCategoryInfoService } from '../meter-category-info';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-meter-info-dialog',
    templateUrl: './meter-info-dialog.component.html'
})
export class MeterInfoDialogComponent implements OnInit {

    meterInfo: MeterInfo;
    isSaving: boolean;

    metercategoryinfos: MeterCategoryInfo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private meterInfoService: MeterInfoService,
        private meterCategoryInfoService: MeterCategoryInfoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.meterCategoryInfoService.query()
            .subscribe((res: ResponseWrapper) => { this.metercategoryinfos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.meterInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.meterInfoService.update(this.meterInfo));
        } else {
            this.subscribeToSaveResponse(
                this.meterInfoService.create(this.meterInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<MeterInfo>) {
        result.subscribe((res: MeterInfo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MeterInfo) {
        this.eventManager.broadcast({ name: 'meterInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMeterCategoryInfoById(index: number, item: MeterCategoryInfo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-meter-info-popup',
    template: ''
})
export class MeterInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private meterInfoPopupService: MeterInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.meterInfoPopupService
                    .open(MeterInfoDialogComponent as Component, params['id']);
            } else {
                this.meterInfoPopupService
                    .open(MeterInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
