import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmCloudWebSharedModule } from '../../shared';
import {
    MeterCategoryInfoService,
    MeterCategoryInfoPopupService,
    MeterCategoryInfoComponent,
    MeterCategoryInfoDetailComponent,
    MeterCategoryInfoDialogComponent,
    MeterCategoryInfoPopupComponent,
    MeterCategoryInfoDeletePopupComponent,
    MeterCategoryInfoDeleteDialogComponent,
    meterCategoryInfoRoute,
    meterCategoryInfoPopupRoute,
    MeterCategoryInfoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...meterCategoryInfoRoute,
    ...meterCategoryInfoPopupRoute,
];

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MeterCategoryInfoComponent,
        MeterCategoryInfoDetailComponent,
        MeterCategoryInfoDialogComponent,
        MeterCategoryInfoDeleteDialogComponent,
        MeterCategoryInfoPopupComponent,
        MeterCategoryInfoDeletePopupComponent,
    ],
    entryComponents: [
        MeterCategoryInfoComponent,
        MeterCategoryInfoDialogComponent,
        MeterCategoryInfoPopupComponent,
        MeterCategoryInfoDeleteDialogComponent,
        MeterCategoryInfoDeletePopupComponent,
    ],
    providers: [
        MeterCategoryInfoService,
        MeterCategoryInfoPopupService,
        MeterCategoryInfoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebMeterCategoryInfoModule {}
