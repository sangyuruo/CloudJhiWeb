import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MultiwaySwitchInfo } from './multiway-switch-info.model';
import { MultiwaySwitchInfoService } from './multiway-switch-info.service';

@Component({
    selector: 'jhi-multiway-switch-info-detail',
    templateUrl: './multiway-switch-info-detail.component.html'
})
export class MultiwaySwitchInfoDetailComponent implements OnInit, OnDestroy {

    multiwaySwitchInfo: MultiwaySwitchInfo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private multiwaySwitchInfoService: MultiwaySwitchInfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMultiwaySwitchInfos();
    }

    load(id) {
        this.multiwaySwitchInfoService.find(id).subscribe((multiwaySwitchInfo) => {
            this.multiwaySwitchInfo = multiwaySwitchInfo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMultiwaySwitchInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'multiwaySwitchInfoListModification',
            (response) => this.load(this.multiwaySwitchInfo.id)
        );
    }
}
