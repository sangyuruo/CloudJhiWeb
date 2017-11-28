import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Compoint } from './compoint.model';
import { CompointService } from './compoint.service';

@Component({
    selector: 'jhi-compoint-detail',
    templateUrl: './compoint-detail.component.html'
})
export class CompointDetailComponent implements OnInit, OnDestroy {

    compoint: Compoint;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private compointService: CompointService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCompoints();
    }

    load(id) {
        this.compointService.find(id).subscribe((compoint) => {
            this.compoint = compoint;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCompoints() {
        this.eventSubscriber = this.eventManager.subscribe(
            'compointListModification',
            (response) => this.load(this.compoint.id)
        );
    }
}
