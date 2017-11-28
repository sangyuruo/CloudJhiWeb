import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmCloudWebSharedModule } from '../../shared';
import {
    CompointService,
    CompointPopupService,
    CompointComponent,
    CompointDetailComponent,
    CompointDialogComponent,
    CompointPopupComponent,
    CompointDeletePopupComponent,
    CompointDeleteDialogComponent,
    compointRoute,
    compointPopupRoute,
    CompointResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...compointRoute,
    ...compointPopupRoute,
];

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CompointComponent,
        CompointDetailComponent,
        CompointDialogComponent,
        CompointDeleteDialogComponent,
        CompointPopupComponent,
        CompointDeletePopupComponent,
    ],
    entryComponents: [
        CompointComponent,
        CompointDialogComponent,
        CompointPopupComponent,
        CompointDeleteDialogComponent,
        CompointDeletePopupComponent,
    ],
    providers: [
        CompointService,
        CompointPopupService,
        CompointResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebCompointModule {}
