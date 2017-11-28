import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MultiwaySwitchInfo } from './multiway-switch-info.model';
import { MultiwaySwitchInfoPopupService } from './multiway-switch-info-popup.service';
import { MultiwaySwitchInfoService } from './multiway-switch-info.service';

@Component({
    selector: 'jhi-multiway-switch-info-dialog',
    templateUrl: './multiway-switch-info-dialog.component.html'
})
export class MultiwaySwitchInfoDialogComponent implements OnInit {

    multiwaySwitchInfo: MultiwaySwitchInfo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private multiwaySwitchInfoService: MultiwaySwitchInfoService,
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
        if (this.multiwaySwitchInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.multiwaySwitchInfoService.update(this.multiwaySwitchInfo));
        } else {
            this.subscribeToSaveResponse(
                this.multiwaySwitchInfoService.create(this.multiwaySwitchInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<MultiwaySwitchInfo>) {
        result.subscribe((res: MultiwaySwitchInfo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MultiwaySwitchInfo) {
        this.eventManager.broadcast({ name: 'multiwaySwitchInfoListModification', content: 'OK'});
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
    selector: 'jhi-multiway-switch-info-popup',
    template: ''
})
export class MultiwaySwitchInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private multiwaySwitchInfoPopupService: MultiwaySwitchInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.multiwaySwitchInfoPopupService
                    .open(MultiwaySwitchInfoDialogComponent as Component, params['id']);
            } else {
                this.multiwaySwitchInfoPopupService
                    .open(MultiwaySwitchInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
