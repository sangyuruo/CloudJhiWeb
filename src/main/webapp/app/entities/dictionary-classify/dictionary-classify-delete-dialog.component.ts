import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DictionaryClassify } from './dictionary-classify.model';
import { DictionaryClassifyPopupService } from './dictionary-classify-popup.service';
import { DictionaryClassifyService } from './dictionary-classify.service';

@Component({
    selector: 'jhi-dictionary-classify-delete-dialog',
    templateUrl: './dictionary-classify-delete-dialog.component.html'
})
export class DictionaryClassifyDeleteDialogComponent {

    dictionaryClassify: DictionaryClassify;

    constructor(
        private dictionaryClassifyService: DictionaryClassifyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dictionaryClassifyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dictionaryClassifyListModification',
                content: 'Deleted an dictionaryClassify'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dictionary-classify-delete-popup',
    template: ''
})
export class DictionaryClassifyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dictionaryClassifyPopupService: DictionaryClassifyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dictionaryClassifyPopupService
                .open(DictionaryClassifyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
