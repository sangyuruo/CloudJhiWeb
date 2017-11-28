import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { NotifyLogComponent } from './notify-log.component';
import { NotifyLogDetailComponent } from './notify-log-detail.component';
import { NotifyLogPopupComponent } from './notify-log-dialog.component';
import { NotifyLogDeletePopupComponent } from './notify-log-delete-dialog.component';

@Injectable()
export class NotifyLogResolvePagingParams implements Resolve<any> {

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

export const notifyLogRoute: Routes = [
    {
        path: 'notify-log',
        component: NotifyLogComponent,
        resolve: {
            'pagingParams': NotifyLogResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.notifyLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'notify-log/:id',
        component: NotifyLogDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.notifyLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notifyLogPopupRoute: Routes = [
    {
        path: 'notify-log-new',
        component: NotifyLogPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.notifyLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'notify-log/:id/edit',
        component: NotifyLogPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.notifyLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'notify-log/:id/delete',
        component: NotifyLogDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.notifyLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
