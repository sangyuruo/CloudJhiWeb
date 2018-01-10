import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmCloudWebSharedModule } from '../../shared';
import {
    AlarmRuleService,
    AlarmRulePopupService,
    AlarmRuleComponent,
    AlarmRuleDetailComponent,
    AlarmRuleDialogComponent,
    AlarmRulePopupComponent,
    AlarmRuleDeletePopupComponent,
    AlarmRuleDeleteDialogComponent,
    alarmRuleRoute,
    alarmRulePopupRoute,
    AlarmRuleResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...alarmRuleRoute,
    ...alarmRulePopupRoute,
];

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AlarmRuleComponent,
        AlarmRuleDetailComponent,
        AlarmRuleDialogComponent,
        AlarmRuleDeleteDialogComponent,
        AlarmRulePopupComponent,
        AlarmRuleDeletePopupComponent,
    ],
    entryComponents: [
        AlarmRuleComponent,
        AlarmRuleDialogComponent,
        AlarmRulePopupComponent,
        AlarmRuleDeleteDialogComponent,
        AlarmRuleDeletePopupComponent,
    ],
    providers: [
        AlarmRuleService,
        AlarmRulePopupService,
        AlarmRuleResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebAlarmRuleModule {}
