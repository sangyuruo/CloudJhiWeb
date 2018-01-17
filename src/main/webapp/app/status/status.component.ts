import {Component, OnDestroy, OnInit} from '@angular/core';

import {Account} from '../shared';
import {OrganizationService} from "../entities/organization/organization.service";
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {Principal} from "../shared/auth/principal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ResponseWrapper} from "../shared/model/response-wrapper.model";
import {ITEMS_PER_PAGE} from "../shared/constants/pagination.constants";
import {MeterInfoService} from "../entities/meter-info/meter-info.service";
import {MeterInfo} from "./meter-info.model";

@Component({
    selector: 'jhi-status',
    templateUrl: './status.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class StatusComponent implements OnInit, OnDestroy {
    companyCode: any;
    account: Account;
    selection: any = null;
    data: any[] = [{
        "id": 0,
        "text": "华翔能源科技",
        "companyCode": "hx001",
        "orgCode": "0",
        "state": "closed"
    }];

    currentAccount: any;
    meterInfos: MeterInfo[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(private meterInfoService: MeterInfoService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private principal: Principal,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private organizationService: OrganizationService,
                private eventManager: JhiEventManager) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.itemsPerPage = 5;
        this.page = 1;
        this.previousPage = 0;
        this.reverse = true;
        this.predicate = "id";
        //
        // this.routeData = this.activatedRoute.data.subscribe((data) => {
        //     this.page = data['pagingParams'].page;
        //     this.previousPage = data['pagingParams'].page;
        //     this.reverse = data['pagingParams'].ascending;
        //     this.predicate = data['pagingParams'].predicate;
        // });
    }

    loadAll() {
        this.meterInfoService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/status'], {
            queryParams:
                {
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
                }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate(['/status', {
            page: this.page,
            sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMeterInfos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MeterInfo) {
        return item.id;
    }

    registerChangeInMeterInfos() {
        this.eventSubscriber = this.eventManager.subscribe('meterInfoListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.meterInfos = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    onSelectionChange(event): void {
        console.log(event.id);
        console.log(event.orgCode);
        this.meterInfoService.queryByOrgCode({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort(),
            companyCode: this.companyCode,
            orgCode: event.orgCode
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    onNodeExpand(event) {
        let node = event;
        console.log(event.orgCode);
        if (node.id == 0 && !node.children) {
            this.companyCode = event.companyCode;
            this.organizationService.queryByCompanyCode(event.companyCode).subscribe((data) => node.children = data);
        }
    }


}
