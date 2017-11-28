import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Dictionary } from './dictionary.model';
import { DictionaryPopupService } from './dictionary-popup.service';
import { DictionaryService } from './dictionary.service';

@Component({
    selector: 'jhi-dictionary-dialog',
    templateUrl: './dictionary-dialog.component.html'
})
export class DictionaryDialogComponent implements OnInit {

    dictionary: Dictionary;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dictionaryService: DictionaryService,
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
        if (this.dictionary.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dictionaryService.update(this.dictionary));
        } else {
            this.subscribeToSaveResponse(
                this.dictionaryService.create(this.dictionary));
        }
    }

    private subscribeToSaveResponse(result: Observable<Dictionary>) {
        result.subscribe((res: Dictionary) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Dictionary) {
        this.eventManager.broadcast({ name: 'dictionaryListModification', content: 'OK'});
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
    selector: 'jhi-dictionary-popup',
    template: ''
})
export class DictionaryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dictionaryPopupService: DictionaryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dictionaryPopupService
                    .open(DictionaryDialogComponent as Component, params['id']);
            } else {
                this.dictionaryPopupService
                    .open(DictionaryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
