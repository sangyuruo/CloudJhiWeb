import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RuleAttributesComponent } from './rule-attributes.component';
import { RuleAttributesDetailComponent } from './rule-attributes-detail.component';
import { RuleAttributesPopupComponent } from './rule-attributes-dialog.component';
import { RuleAttributesDeletePopupComponent } from './rule-attributes-delete-dialog.component';

@Injectable()
export class RuleAttributesResolvePagingParams implements Resolve<any> {

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

export const ruleAttributesRoute: Routes = [
    {
        path: 'rule-attributes',
        component: RuleAttributesComponent,
        resolve: {
            'pagingParams': RuleAttributesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.ruleAttributes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rule-attributes/:id',
        component: RuleAttributesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.ruleAttributes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ruleAttributesPopupRoute: Routes = [
    {
        path: 'rule-attributes-new',
        component: RuleAttributesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.ruleAttributes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rule-attributes/:id/edit',
        component: RuleAttributesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.ruleAttributes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rule-attributes/:id/delete',
        component: RuleAttributesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.ruleAttributes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
