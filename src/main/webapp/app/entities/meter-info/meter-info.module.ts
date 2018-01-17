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
import {MeterInfoDetailPopupComponent} from "./meter-info-detail.component";

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
        MeterInfoDialogComponent,
        MeterInfoDetailComponent,
        MeterInfoDetailPopupComponent,
        MeterInfoDeleteDialogComponent,
        MeterInfoPopupComponent,
        MeterInfoDeletePopupComponent,
    ],
    entryComponents: [
        MeterInfoComponent,
        MeterInfoDialogComponent,
        MeterInfoPopupComponent,
        MeterInfoDetailComponent,
        MeterInfoDetailPopupComponent,
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
