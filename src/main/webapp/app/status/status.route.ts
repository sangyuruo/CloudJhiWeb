import { Route } from '@angular/router';

import { StatusComponent } from './';

export const HOME_ROUTE: Route = {
    path: 'status',
    component: StatusComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    },
};
