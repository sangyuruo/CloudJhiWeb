import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MeterInfo } from './meter-info.model';
import { MeterInfoPopupService } from './meter-info-popup.service';
import { MeterInfoService } from './meter-info.service';

@Component({
    selector: 'jhi-meter-info-delete-dialog',
    templateUrl: './meter-info-delete-dialog.component.html'
})
export class MeterInfoDeleteDialogComponent {

    meterInfo: MeterInfo;

    constructor(
        private meterInfoService: MeterInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.meterInfoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'meterInfoListModification',
                content: 'Deleted an meterInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meter-info-delete-popup',
    template: ''
})
export class MeterInfoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private meterInfoPopupService: MeterInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.meterInfoPopupService
                .open(MeterInfoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
