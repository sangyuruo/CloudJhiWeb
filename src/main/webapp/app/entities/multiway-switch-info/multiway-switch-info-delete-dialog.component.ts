import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MultiwaySwitchInfo } from './multiway-switch-info.model';
import { MultiwaySwitchInfoPopupService } from './multiway-switch-info-popup.service';
import { MultiwaySwitchInfoService } from './multiway-switch-info.service';

@Component({
    selector: 'jhi-multiway-switch-info-delete-dialog',
    templateUrl: './multiway-switch-info-delete-dialog.component.html'
})
export class MultiwaySwitchInfoDeleteDialogComponent {

    multiwaySwitchInfo: MultiwaySwitchInfo;

    constructor(
        private multiwaySwitchInfoService: MultiwaySwitchInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.multiwaySwitchInfoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'multiwaySwitchInfoListModification',
                content: 'Deleted an multiwaySwitchInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-multiway-switch-info-delete-popup',
    template: ''
})
export class MultiwaySwitchInfoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private multiwaySwitchInfoPopupService: MultiwaySwitchInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.multiwaySwitchInfoPopupService
                .open(MultiwaySwitchInfoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
