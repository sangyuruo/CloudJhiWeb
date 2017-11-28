import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DictionaryClassify } from './dictionary-classify.model';
import { DictionaryClassifyPopupService } from './dictionary-classify-popup.service';
import { DictionaryClassifyService } from './dictionary-classify.service';
import { Dictionary, DictionaryService } from '../dictionary';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dictionary-classify-dialog',
    templateUrl: './dictionary-classify-dialog.component.html'
})
export class DictionaryClassifyDialogComponent implements OnInit {

    dictionaryClassify: DictionaryClassify;
    isSaving: boolean;

    dictionaries: Dictionary[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dictionaryClassifyService: DictionaryClassifyService,
        private dictionaryService: DictionaryService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.dictionaryService.query()
            .subscribe((res: ResponseWrapper) => { this.dictionaries = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dictionaryClassify.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dictionaryClassifyService.update(this.dictionaryClassify));
        } else {
            this.subscribeToSaveResponse(
                this.dictionaryClassifyService.create(this.dictionaryClassify));
        }
    }

    private subscribeToSaveResponse(result: Observable<DictionaryClassify>) {
        result.subscribe((res: DictionaryClassify) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DictionaryClassify) {
        this.eventManager.broadcast({ name: 'dictionaryClassifyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDictionaryById(index: number, item: Dictionary) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-dictionary-classify-popup',
    template: ''
})
export class DictionaryClassifyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dictionaryClassifyPopupService: DictionaryClassifyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dictionaryClassifyPopupService
                    .open(DictionaryClassifyDialogComponent as Component, params['id']);
            } else {
                this.dictionaryClassifyPopupService
                    .open(DictionaryClassifyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
