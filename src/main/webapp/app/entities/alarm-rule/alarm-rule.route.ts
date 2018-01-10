import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AlarmRuleComponent } from './alarm-rule.component';
import { AlarmRuleDetailComponent } from './alarm-rule-detail.component';
import { AlarmRulePopupComponent } from './alarm-rule-dialog.component';
import { AlarmRuleDeletePopupComponent } from './alarm-rule-delete-dialog.component';

@Injectable()
export class AlarmRuleResolvePagingParams implements Resolve<any> {

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

export const alarmRuleRoute: Routes = [
    {
        path: 'alarm-rule',
        component: AlarmRuleComponent,
        resolve: {
            'pagingParams': AlarmRuleResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.alarmRule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'alarm-rule/:id',
        component: AlarmRuleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.alarmRule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alarmRulePopupRoute: Routes = [
    {
        path: 'alarm-rule-new',
        component: AlarmRulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.alarmRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alarm-rule/:id/edit',
        component: AlarmRulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.alarmRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alarm-rule/:id/delete',
        component: AlarmRuleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.alarmRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
