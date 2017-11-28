import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MessageTemplateComponent } from './message-template.component';
import { MessageTemplateDetailComponent } from './message-template-detail.component';
import { MessageTemplatePopupComponent } from './message-template-dialog.component';
import { MessageTemplateDeletePopupComponent } from './message-template-delete-dialog.component';

@Injectable()
export class MessageTemplateResolvePagingParams implements Resolve<any> {

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

export const messageTemplateRoute: Routes = [
    {
        path: 'message-template',
        component: MessageTemplateComponent,
        resolve: {
            'pagingParams': MessageTemplateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.messageTemplate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'message-template/:id',
        component: MessageTemplateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.messageTemplate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const messageTemplatePopupRoute: Routes = [
    {
        path: 'message-template-new',
        component: MessageTemplatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.messageTemplate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'message-template/:id/edit',
        component: MessageTemplatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.messageTemplate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'message-template/:id/delete',
        component: MessageTemplateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.messageTemplate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
