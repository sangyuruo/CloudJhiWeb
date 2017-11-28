import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NotifyLog } from './notify-log.model';
import { NotifyLogPopupService } from './notify-log-popup.service';
import { NotifyLogService } from './notify-log.service';

@Component({
    selector: 'jhi-notify-log-delete-dialog',
    templateUrl: './notify-log-delete-dialog.component.html'
})
export class NotifyLogDeleteDialogComponent {

    notifyLog: NotifyLog;

    constructor(
        private notifyLogService: NotifyLogService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.notifyLogService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'notifyLogListModification',
                content: 'Deleted an notifyLog'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-notify-log-delete-popup',
    template: ''
})
export class NotifyLogDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notifyLogPopupService: NotifyLogPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.notifyLogPopupService
                .open(NotifyLogDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
