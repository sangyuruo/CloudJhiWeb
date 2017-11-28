import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MultiwaySwitchInfoComponent } from './multiway-switch-info.component';
import { MultiwaySwitchInfoDetailComponent } from './multiway-switch-info-detail.component';
import { MultiwaySwitchInfoPopupComponent } from './multiway-switch-info-dialog.component';
import { MultiwaySwitchInfoDeletePopupComponent } from './multiway-switch-info-delete-dialog.component';

@Injectable()
export class MultiwaySwitchInfoResolvePagingParams implements Resolve<any> {

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

export const multiwaySwitchInfoRoute: Routes = [
    {
        path: 'multiway-switch-info',
        component: MultiwaySwitchInfoComponent,
        resolve: {
            'pagingParams': MultiwaySwitchInfoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.multiwaySwitchInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'multiway-switch-info/:id',
        component: MultiwaySwitchInfoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.multiwaySwitchInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const multiwaySwitchInfoPopupRoute: Routes = [
    {
        path: 'multiway-switch-info-new',
        component: MultiwaySwitchInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.multiwaySwitchInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'multiway-switch-info/:id/edit',
        component: MultiwaySwitchInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.multiwaySwitchInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'multiway-switch-info/:id/delete',
        component: MultiwaySwitchInfoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.multiwaySwitchInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
