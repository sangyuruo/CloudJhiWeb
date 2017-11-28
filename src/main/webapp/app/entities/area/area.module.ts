import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmCloudWebSharedModule } from '../../shared';
import {
    AreaService,
    AreaPopupService,
    AreaComponent,
    AreaDetailComponent,
    AreaDialogComponent,
    AreaPopupComponent,
    AreaDeletePopupComponent,
    AreaDeleteDialogComponent,
    areaRoute,
    areaPopupRoute,
    AreaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...areaRoute,
    ...areaPopupRoute,
];

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AreaComponent,
        AreaDetailComponent,
        AreaDialogComponent,
        AreaDeleteDialogComponent,
        AreaPopupComponent,
        AreaDeletePopupComponent,
    ],
    entryComponents: [
        AreaComponent,
        AreaDialogComponent,
        AreaPopupComponent,
        AreaDeleteDialogComponent,
        AreaDeletePopupComponent,
    ],
    providers: [
        AreaService,
        AreaPopupService,
        AreaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebAreaModule {}
