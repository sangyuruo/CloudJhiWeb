import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmCloudWebSharedModule } from '../shared';

import { HOME_ROUTE, StatusComponent } from './';
import {TreeComponent} from "./tree/tree.component";
import {EasyUIModule} from "../easyui/components/easyui/easyui.module";
import {EmClouWebOUModule} from "./data/company.module";
import {OuComponent} from "./data/company.component";
import {CompanyResolvePagingParams} from "./data/company.route";

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        // EmClouWebOUModule,
        EasyUIModule,
        RouterModule.forRoot( HOME_ROUTE , { useHash: true })
    ],
    declarations: [
        OuComponent,
        StatusComponent,
        TreeComponent
    ],
    entryComponents: [
    ],
    providers: [
        CompanyResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebStatusModule {}

