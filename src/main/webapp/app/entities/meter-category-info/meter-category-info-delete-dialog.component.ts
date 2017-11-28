import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MeterCategoryInfo } from './meter-category-info.model';
import { MeterCategoryInfoPopupService } from './meter-category-info-popup.service';
import { MeterCategoryInfoService } from './meter-category-info.service';

@Component({
    selector: 'jhi-meter-category-info-delete-dialog',
    templateUrl: './meter-category-info-delete-dialog.component.html'
})
export class MeterCategoryInfoDeleteDialogComponent {

    meterCategoryInfo: MeterCategoryInfo;

    constructor(
        private meterCategoryInfoService: MeterCategoryInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.meterCategoryInfoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'meterCategoryInfoListModification',
                content: 'Deleted an meterCategoryInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meter-category-info-delete-popup',
    template: ''
})
export class MeterCategoryInfoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private meterCategoryInfoPopupService: MeterCategoryInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.meterCategoryInfoPopupService
                .open(MeterCategoryInfoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
