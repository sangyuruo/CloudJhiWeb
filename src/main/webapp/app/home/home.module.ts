import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmCloudWebSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import {TreeComponent} from "./tree/tree.component";
import {EasyUIModule} from "../easyui/components/easyui/easyui.module";
import {CompanyResolvePagingParams} from "../entities/company/company.route";

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        EasyUIModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: true })
    ],
    declarations: [
        HomeComponent,
        TreeComponent
    ],
    entryComponents: [
    ],
    providers: [
        CompanyResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebHomeModule {}

