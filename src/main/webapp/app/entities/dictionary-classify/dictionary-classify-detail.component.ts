import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { DictionaryClassify } from './dictionary-classify.model';
import { DictionaryClassifyService } from './dictionary-classify.service';

@Component({
    selector: 'jhi-dictionary-classify-detail',
    templateUrl: './dictionary-classify-detail.component.html'
})
export class DictionaryClassifyDetailComponent implements OnInit, OnDestroy {

    dictionaryClassify: DictionaryClassify;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dictionaryClassifyService: DictionaryClassifyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDictionaryClassifies();
    }

    load(id) {
        this.dictionaryClassifyService.find(id).subscribe((dictionaryClassify) => {
            this.dictionaryClassify = dictionaryClassify;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDictionaryClassifies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dictionaryClassifyListModification',
            (response) => this.load(this.dictionaryClassify.id)
        );
    }
}
