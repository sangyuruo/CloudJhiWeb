import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { NotifyLog } from './notify-log.model';
import { NotifyLogPopupService } from './notify-log-popup.service';
import { NotifyLogService } from './notify-log.service';

@Component({
    selector: 'jhi-notify-log-dialog',
    templateUrl: './notify-log-dialog.component.html'
})
export class NotifyLogDialogComponent implements OnInit {

    notifyLog: NotifyLog;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private notifyLogService: NotifyLogService,
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
        if (this.notifyLog.id !== undefined) {
            this.subscribeToSaveResponse(
                this.notifyLogService.update(this.notifyLog));
        } else {
            this.subscribeToSaveResponse(
                this.notifyLogService.create(this.notifyLog));
        }
    }

    private subscribeToSaveResponse(result: Observable<NotifyLog>) {
        result.subscribe((res: NotifyLog) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: NotifyLog) {
        this.eventManager.broadcast({ name: 'notifyLogListModification', content: 'OK'});
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
    selector: 'jhi-notify-log-popup',
    template: ''
})
export class NotifyLogPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notifyLogPopupService: NotifyLogPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.notifyLogPopupService
                    .open(NotifyLogDialogComponent as Component, params['id']);
            } else {
                this.notifyLogPopupService
                    .open(NotifyLogDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
