import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { EmCloudWebSharedModule, UserRouteAccessService } from './shared';
import { EmCloudWebHomeModule } from './home/home.module';
import { EmCloudWebAdminModule } from './admin/admin.module';
import { EmCloudWebAccountModule } from './account/account.module';
import { EmCloudWebEntityModule } from './entities/entity.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import {EasyUIModule} from "./easyui/components/easyui/easyui.module";
import {EmCloudWebStatusModule} from "./status/status.module";


@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        EmCloudWebSharedModule,
        EmCloudWebHomeModule,
        EmCloudWebAdminModule,
        EmCloudWebAccountModule,
        EmCloudWebEntityModule,
        EmCloudWebStatusModule,
        EasyUIModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class EmCloudWebAppModule {}
