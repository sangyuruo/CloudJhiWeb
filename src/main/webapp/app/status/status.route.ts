import {Route, Routes} from '@angular/router';

import { StatusComponent } from './';
import {OuComponent} from "./data/company.component";
import {CompanyResolvePagingParams} from "./data/company.route";
import {UserRouteAccessService} from "../shared/auth/user-route-access-service";

export const HOME_ROUTE: Routes = [
    {
        path: 'status',
        component: StatusComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        },
    },
    {
        path: 'status/tree_data',
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
