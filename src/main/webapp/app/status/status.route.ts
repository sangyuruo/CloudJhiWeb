import {Routes} from '@angular/router';

import {StatusComponent} from './';
import {CompanyResolvePagingParams} from "./data/company.route";

export const HOME_ROUTE: Routes = [
    {
        path: 'status',
        component: StatusComponent,
        resolve: {
            'pagingParams': CompanyResolvePagingParams
        },
        data: {
            authorities: [],
            pageTitle: 'home.title'
        },
    }
];
