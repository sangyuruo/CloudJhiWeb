import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmCloudWebSharedModule } from '../../shared';
import {
    RuleAttributesService,
    RuleAttributesPopupService,
    RuleAttributesComponent,
    RuleAttributesDetailComponent,
    RuleAttributesDialogComponent,
    RuleAttributesPopupComponent,
    RuleAttributesDeletePopupComponent,
    RuleAttributesDeleteDialogComponent,
    ruleAttributesRoute,
    ruleAttributesPopupRoute,
    RuleAttributesResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ruleAttributesRoute,
    ...ruleAttributesPopupRoute,
];

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RuleAttributesComponent,
        RuleAttributesDetailComponent,
        RuleAttributesDialogComponent,
        RuleAttributesDeleteDialogComponent,
        RuleAttributesPopupComponent,
        RuleAttributesDeletePopupComponent,
    ],
    entryComponents: [
        RuleAttributesComponent,
        RuleAttributesDialogComponent,
        RuleAttributesPopupComponent,
        RuleAttributesDeleteDialogComponent,
        RuleAttributesDeletePopupComponent,
    ],
    providers: [
        RuleAttributesService,
        RuleAttributesPopupService,
        RuleAttributesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebRuleAttributesModule {}
