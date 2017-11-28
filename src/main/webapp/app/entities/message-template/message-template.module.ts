import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmCloudWebSharedModule } from '../../shared';
import {
    MessageTemplateService,
    MessageTemplatePopupService,
    MessageTemplateComponent,
    MessageTemplateDetailComponent,
    MessageTemplateDialogComponent,
    MessageTemplatePopupComponent,
    MessageTemplateDeletePopupComponent,
    MessageTemplateDeleteDialogComponent,
    messageTemplateRoute,
    messageTemplatePopupRoute,
    MessageTemplateResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...messageTemplateRoute,
    ...messageTemplatePopupRoute,
];

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MessageTemplateComponent,
        MessageTemplateDetailComponent,
        MessageTemplateDialogComponent,
        MessageTemplateDeleteDialogComponent,
        MessageTemplatePopupComponent,
        MessageTemplateDeletePopupComponent,
    ],
    entryComponents: [
        MessageTemplateComponent,
        MessageTemplateDialogComponent,
        MessageTemplatePopupComponent,
        MessageTemplateDeleteDialogComponent,
        MessageTemplateDeletePopupComponent,
    ],
    providers: [
        MessageTemplateService,
        MessageTemplatePopupService,
        MessageTemplateResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebMessageTemplateModule {}
