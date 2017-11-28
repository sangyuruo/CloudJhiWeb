import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Dictionary } from './dictionary.model';
import { DictionaryPopupService } from './dictionary-popup.service';
import { DictionaryService } from './dictionary.service';

@Component({
    selector: 'jhi-dictionary-delete-dialog',
    templateUrl: './dictionary-delete-dialog.component.html'
})
export class DictionaryDeleteDialogComponent {

    dictionary: Dictionary;

    constructor(
        private dictionaryService: DictionaryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dictionaryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dictionaryListModification',
                content: 'Deleted an dictionary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dictionary-delete-popup',
    template: ''
})
export class DictionaryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dictionaryPopupService: DictionaryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dictionaryPopupService
                .open(DictionaryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
