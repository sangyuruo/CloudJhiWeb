import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Dictionary } from './dictionary.model';
import { DictionaryService } from './dictionary.service';

@Component({
    selector: 'jhi-dictionary-detail',
    templateUrl: './dictionary-detail.component.html'
})
export class DictionaryDetailComponent implements OnInit, OnDestroy {

    dictionary: Dictionary;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dictionaryService: DictionaryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDictionaries();
    }

    load(id) {
        this.dictionaryService.find(id).subscribe((dictionary) => {
            this.dictionary = dictionary;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDictionaries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dictionaryListModification',
            (response) => this.load(this.dictionary.id)
        );
    }
}
