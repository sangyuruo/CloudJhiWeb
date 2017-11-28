import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Area } from './area.model';
import { AreaPopupService } from './area-popup.service';
import { AreaService } from './area.service';

@Component({
    selector: 'jhi-area-delete-dialog',
    templateUrl: './area-delete-dialog.component.html'
})
export class AreaDeleteDialogComponent {

    area: Area;

    constructor(
        private areaService: AreaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.areaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'areaListModification',
                content: 'Deleted an area'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-area-delete-popup',
    template: ''
})
export class AreaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private areaPopupService: AreaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.areaPopupService
                .open(AreaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
