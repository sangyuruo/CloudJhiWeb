import {CUSTOM_ELEMENTS_SCHEMA, enableProdMode, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EmCloudWebSharedModule} from '../shared';

import {HOME_ROUTE, MeterComponent} from './';
import {EasyUIModule} from "../easyui/components/easyui/easyui.module";
import {CompanyResolvePagingParams} from "./meter.route";

enableProdMode();

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        // EmClouWebOUModule,
        EasyUIModule,
        RouterModule.forRoot( HOME_ROUTE , { useHash: true })
    ],
    declarations: [
        MeterComponent,
    ],
    entryComponents: [
    ],
    providers: [
        CompanyResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudMeterModule {}

