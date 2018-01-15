import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmCloudWebSharedModule } from '../../shared';
import {
    OuComponent,
} from './';
import {CompanyResolvePagingParams, companyRoute} from "./company.route";

const ENTITY_STATES = [
    ...companyRoute,
];

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OuComponent,
    ],
    entryComponents: [
        OuComponent,
    ],
    providers: [
        CompanyResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmClouWebOUModule {}
