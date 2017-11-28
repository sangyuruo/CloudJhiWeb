import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AreaComponent } from './area.component';
import { AreaDetailComponent } from './area-detail.component';
import { AreaPopupComponent } from './area-dialog.component';
import { AreaDeletePopupComponent } from './area-delete-dialog.component';

@Injectable()
export class AreaResolvePagingParams implements Resolve<any> {

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

export const areaRoute: Routes = [
    {
        path: 'area',
        component: AreaComponent,
        resolve: {
            'pagingParams': AreaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.area.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'area/:id',
        component: AreaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.area.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const areaPopupRoute: Routes = [
    {
        path: 'area-new',
        component: AreaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.area.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'area/:id/edit',
        component: AreaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.area.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'area/:id/delete',
        component: AreaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.area.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
