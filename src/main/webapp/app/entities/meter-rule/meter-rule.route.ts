import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MeterRuleComponent } from './meter-rule.component';
import { MeterRuleDetailComponent } from './meter-rule-detail.component';
import { MeterRulePopupComponent } from './meter-rule-dialog.component';
import { MeterRuleDeletePopupComponent } from './meter-rule-delete-dialog.component';

@Injectable()
export class MeterRuleResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const meterRuleRoute: Routes = [
    {
        path: 'meter-rule',
        component: MeterRuleComponent,
        resolve: {
            'pagingParams': MeterRuleResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.meterRule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'meter-rule/:id',
        component: MeterRuleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.meterRule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const meterRulePopupRoute: Routes = [
    {
        path: 'meter-rule-new',
        component: MeterRulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.meterRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'meter-rule/:id/edit',
        component: MeterRulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.meterRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'meter-rule/:id/delete',
        component: MeterRuleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.meterRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
