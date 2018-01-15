import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OuComponent } from './company.component';

@Injectable()
export class CompanyResolvePagingParams implements Resolve<any> {

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

export const companyRoute: Routes = [
    {
        path: 'tree_data',
        component: OuComponent,
        resolve: {
            'pagingParams': CompanyResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'emCloudWebApp.company.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
];
