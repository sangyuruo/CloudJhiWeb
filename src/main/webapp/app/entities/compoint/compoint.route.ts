import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CompointComponent } from './compoint.component';
import { CompointDetailComponent } from './compoint-detail.component';
import { CompointPopupComponent } from './compoint-dialog.component';
import { CompointDeletePopupComponent } from './compoint-delete-dialog.component';

@Injectable()
export class CompointResolvePagingParams implements Resolve<any> {

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

export const compointRoute: Routes = [
    {
        path: 'compoint',
        component: CompointComponent,
        resolve: {
            'pagingParams': CompointResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.compoint.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'compoint/:id',
        component: CompointDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.compoint.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const compointPopupRoute: Routes = [
    {
        path: 'compoint-new',
        component: CompointPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.compoint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compoint/:id/edit',
        component: CompointPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.compoint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compoint/:id/delete',
        component: CompointDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.compoint.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
