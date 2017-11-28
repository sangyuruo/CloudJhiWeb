import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MeterInfo } from './meter-info.model';
import { MeterInfoService } from './meter-info.service';

@Component({
    selector: 'jhi-meter-info-detail',
    templateUrl: './meter-info-detail.component.html'
})
export class MeterInfoDetailComponent implements OnInit, OnDestroy {

    meterInfo: MeterInfo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private meterInfoService: MeterInfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMeterInfos();
    }

    load(id) {
        this.meterInfoService.find(id).subscribe((meterInfo) => {
            this.meterInfo = meterInfo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMeterInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'meterInfoListModification',
            (response) => this.load(this.meterInfo.id)
        );
    }
}
