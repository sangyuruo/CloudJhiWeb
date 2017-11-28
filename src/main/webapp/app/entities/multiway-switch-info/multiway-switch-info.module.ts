import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmCloudWebSharedModule } from '../../shared';
import {
    MultiwaySwitchInfoService,
    MultiwaySwitchInfoPopupService,
    MultiwaySwitchInfoComponent,
    MultiwaySwitchInfoDetailComponent,
    MultiwaySwitchInfoDialogComponent,
    MultiwaySwitchInfoPopupComponent,
    MultiwaySwitchInfoDeletePopupComponent,
    MultiwaySwitchInfoDeleteDialogComponent,
    multiwaySwitchInfoRoute,
    multiwaySwitchInfoPopupRoute,
    MultiwaySwitchInfoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...multiwaySwitchInfoRoute,
    ...multiwaySwitchInfoPopupRoute,
];

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MultiwaySwitchInfoComponent,
        MultiwaySwitchInfoDetailComponent,
        MultiwaySwitchInfoDialogComponent,
        MultiwaySwitchInfoDeleteDialogComponent,
        MultiwaySwitchInfoPopupComponent,
        MultiwaySwitchInfoDeletePopupComponent,
    ],
    entryComponents: [
        MultiwaySwitchInfoComponent,
        MultiwaySwitchInfoDialogComponent,
        MultiwaySwitchInfoPopupComponent,
        MultiwaySwitchInfoDeleteDialogComponent,
        MultiwaySwitchInfoDeletePopupComponent,
    ],
    providers: [
        MultiwaySwitchInfoService,
        MultiwaySwitchInfoPopupService,
        MultiwaySwitchInfoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebMultiwaySwitchInfoModule {}
