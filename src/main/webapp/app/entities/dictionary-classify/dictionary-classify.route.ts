import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DictionaryClassifyComponent } from './dictionary-classify.component';
import { DictionaryClassifyDetailComponent } from './dictionary-classify-detail.component';
import { DictionaryClassifyPopupComponent } from './dictionary-classify-dialog.component';
import { DictionaryClassifyDeletePopupComponent } from './dictionary-classify-delete-dialog.component';

@Injectable()
export class DictionaryClassifyResolvePagingParams implements Resolve<any> {

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

export const dictionaryClassifyRoute: Routes = [
    {
        path: 'dictionary-classify',
        component: DictionaryClassifyComponent,
        resolve: {
            'pagingParams': DictionaryClassifyResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.dictionaryClassify.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dictionary-classify/:id',
        component: DictionaryClassifyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.dictionaryClassify.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dictionaryClassifyPopupRoute: Routes = [
    {
        path: 'dictionary-classify-new',
        component: DictionaryClassifyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.dictionaryClassify.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dictionary-classify/:id/edit',
        component: DictionaryClassifyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.dictionaryClassify.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dictionary-classify/:id/delete',
        component: DictionaryClassifyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.dictionaryClassify.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
