import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MeterCategoryInfo } from './meter-category-info.model';
import { MeterCategoryInfoService } from './meter-category-info.service';

@Component({
    selector: 'jhi-meter-category-info-detail',
    templateUrl: './meter-category-info-detail.component.html'
})
export class MeterCategoryInfoDetailComponent implements OnInit, OnDestroy {

    meterCategoryInfo: MeterCategoryInfo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private meterCategoryInfoService: MeterCategoryInfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMeterCategoryInfos();
    }

    load(id) {
        this.meterCategoryInfoService.find(id).subscribe((meterCategoryInfo) => {
            this.meterCategoryInfo = meterCategoryInfo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMeterCategoryInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'meterCategoryInfoListModification',
            (response) => this.load(this.meterCategoryInfo.id)
        );
    }
}
