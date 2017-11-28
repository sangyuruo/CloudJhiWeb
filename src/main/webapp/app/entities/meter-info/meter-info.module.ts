import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmCloudWebSharedModule } from '../../shared';
import {
    MeterInfoService,
    MeterInfoPopupService,
    MeterInfoComponent,
    MeterInfoDetailComponent,
    MeterInfoDialogComponent,
    MeterInfoPopupComponent,
    MeterInfoDeletePopupComponent,
    MeterInfoDeleteDialogComponent,
    meterInfoRoute,
    meterInfoPopupRoute,
    MeterInfoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...meterInfoRoute,
    ...meterInfoPopupRoute,
];

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MeterInfoComponent,
        MeterInfoDetailComponent,
        MeterInfoDialogComponent,
        MeterInfoDeleteDialogComponent,
        MeterInfoPopupComponent,
        MeterInfoDeletePopupComponent,
    ],
    entryComponents: [
        MeterInfoComponent,
        MeterInfoDialogComponent,
        MeterInfoPopupComponent,
        MeterInfoDeleteDialogComponent,
        MeterInfoDeletePopupComponent,
    ],
    providers: [
        MeterInfoService,
        MeterInfoPopupService,
        MeterInfoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebMeterInfoModule {}
