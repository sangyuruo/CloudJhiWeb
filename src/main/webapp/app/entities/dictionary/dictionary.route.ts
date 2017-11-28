import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DictionaryComponent } from './dictionary.component';
import { DictionaryDetailComponent } from './dictionary-detail.component';
import { DictionaryPopupComponent } from './dictionary-dialog.component';
import { DictionaryDeletePopupComponent } from './dictionary-delete-dialog.component';

@Injectable()
export class DictionaryResolvePagingParams implements Resolve<any> {

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

export const dictionaryRoute: Routes = [
    {
        path: 'dictionary',
        component: DictionaryComponent,
        resolve: {
            'pagingParams': DictionaryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.dictionary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dictionary/:id',
        component: DictionaryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.dictionary.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dictionaryPopupRoute: Routes = [
    {
        path: 'dictionary-new',
        component: DictionaryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.dictionary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dictionary/:id/edit',
        component: DictionaryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.dictionary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dictionary/:id/delete',
        component: DictionaryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.dictionary.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
