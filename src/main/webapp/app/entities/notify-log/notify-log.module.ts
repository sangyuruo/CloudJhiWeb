import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmCloudWebSharedModule } from '../../shared';
import {
    NotifyLogService,
    NotifyLogPopupService,
    NotifyLogComponent,
    NotifyLogDetailComponent,
    NotifyLogDialogComponent,
    NotifyLogPopupComponent,
    NotifyLogDeletePopupComponent,
    NotifyLogDeleteDialogComponent,
    notifyLogRoute,
    notifyLogPopupRoute,
    NotifyLogResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...notifyLogRoute,
    ...notifyLogPopupRoute,
];

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        NotifyLogComponent,
        NotifyLogDetailComponent,
        NotifyLogDialogComponent,
        NotifyLogDeleteDialogComponent,
        NotifyLogPopupComponent,
        NotifyLogDeletePopupComponent,
    ],
    entryComponents: [
        NotifyLogComponent,
        NotifyLogDialogComponent,
        NotifyLogPopupComponent,
        NotifyLogDeleteDialogComponent,
        NotifyLogDeletePopupComponent,
    ],
    providers: [
        NotifyLogService,
        NotifyLogPopupService,
        NotifyLogResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebNotifyLogModule {}
