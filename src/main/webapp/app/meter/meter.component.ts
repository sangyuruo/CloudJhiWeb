import {Component, OnInit} from '@angular/core';
import {OrganizationService} from "../entities/organization/organization.service";
import {JhiAlertService, JhiParseLinks} from 'ng-jhipster';
import {ResponseWrapper} from "../shared/model/response-wrapper.model";
import {MeterInfoService} from "../entities/meter-info/meter-info.service";

@Component({
    selector: 'jhi-status',
    templateUrl: './meter.component.html',
    styleUrls: [
        'home.scss'
    ],
    styles: [`
        .item {
            margin: 6px 30px;
            text-align: left;
        }

        .item-img {
            height: 60px;
        }

        .item-desp {
            line-height: 30px;
        }
    `]

})
export class MeterComponent implements OnInit {

    links: any;
    total: number = 0;
    pageNumber = 1;
    pageSize = 5;
    data = [];
    loading: boolean = false;
    pagePosition: string = 'bottom';

    ngOnInit(): void {
        this.loadDataPage(this.pageNumber, this.pageSize);
    }

    ngAfterViewInit() {
        // this.loadDataPage(this.pageNumber, this.pageSize);
    }

    onPageChange(event) {
        console.log(event.pageNumber);
        console.log(event.pageSize);
        this.loadDataPage(event.pageNumber, event.pageSize);
    }

    loadDataPage(pageNumber: number, pageSize: number) {
        this.loading = true;
        this.meterInfoService.queryByOrgCode({
            page: pageNumber - 1,
            size: pageSize,
            companyCode: this.companyCode,
            orgCode: this.orgCode
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    companyCode: any = 'hx001';
    orgCode: any = '0';

    selection: any = null;
    treedata: any[] = [{
        "id": 0,
        "text": "华翔能源科技",
        "companyCode": this.companyCode,
        "orgCode": this.orgCode,
        "state": "closed"
    }];

    constructor(private meterInfoService: MeterInfoService,
                private parseLinks: JhiParseLinks,
                private jhiAlertService: JhiAlertService,
                private organizationService: OrganizationService,) {
        //
        // this.routeData = this.activatedRoute.data.subscribe((data) => {
        //     this.page = data['pagingParams'].page;
        //     this.previousPage = data['pagingParams'].page;
        //     this.reverse = data['pagingParams'].ascending;
        //     this.predicate = data['pagingParams'].predicate;
        // });
    }


    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        // this.page = pagingParams.page;
        // this.pageNumber = data.pageNumber;
        this.total = headers.get('X-Total-Count');
        this.data = data;
        this.loading = false;
    }

    private onError(error) {
        this.total = 0;
        this.data = [];
        this.loading = false;
        // this.jhiAlertService.error(error.message, null, null);
    }

    onSelectionChange(event): void {
        this.orgCode = event.orgCode;
        console.log(event.id);
        console.log(event.orgCode);
        this.meterInfoService.queryByOrgCode({
            page: this.pageNumber - 1,
            size: this.pageSize,
            companyCode: this.companyCode,
            orgCode: this.orgCode
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

    onEditRow(row) {
    }

    onSaveRow(row) {
    }

    onDeleteRow(row) {
    }

}
