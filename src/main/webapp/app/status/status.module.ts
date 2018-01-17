import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EmCloudWebSharedModule} from '../shared';

import {HOME_ROUTE, StatusComponent} from './';
import {EasyUIModule} from "../easyui/components/easyui/easyui.module";
import {CompanyResolvePagingParams} from "./data/company.route";

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        // EmClouWebOUModule,
        EasyUIModule,
        RouterModule.forRoot( HOME_ROUTE , { useHash: true })
    ],
    declarations: [
        StatusComponent,
    ],
    entryComponents: [
    ],
    providers: [
        CompanyResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebStatusModule {}

