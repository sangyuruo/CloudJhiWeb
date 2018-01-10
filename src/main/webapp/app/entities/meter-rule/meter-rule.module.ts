import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmCloudWebSharedModule } from '../../shared';
import {
    MeterRuleService,
    MeterRulePopupService,
    MeterRuleComponent,
    MeterRuleDetailComponent,
    MeterRuleDialogComponent,
    MeterRulePopupComponent,
    MeterRuleDeletePopupComponent,
    MeterRuleDeleteDialogComponent,
    meterRuleRoute,
    meterRulePopupRoute,
    MeterRuleResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...meterRuleRoute,
    ...meterRulePopupRoute,
];

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MeterRuleComponent,
        MeterRuleDetailComponent,
        MeterRuleDialogComponent,
        MeterRuleDeleteDialogComponent,
        MeterRulePopupComponent,
        MeterRuleDeletePopupComponent,
    ],
    entryComponents: [
        MeterRuleComponent,
        MeterRuleDialogComponent,
        MeterRulePopupComponent,
        MeterRuleDeleteDialogComponent,
        MeterRuleDeletePopupComponent,
    ],
    providers: [
        MeterRuleService,
        MeterRulePopupService,
        MeterRuleResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebMeterRuleModule {}
