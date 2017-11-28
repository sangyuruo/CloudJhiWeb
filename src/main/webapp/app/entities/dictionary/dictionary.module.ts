import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmCloudWebSharedModule } from '../../shared';
import {
    DictionaryService,
    DictionaryPopupService,
    DictionaryComponent,
    DictionaryDetailComponent,
    DictionaryDialogComponent,
    DictionaryPopupComponent,
    DictionaryDeletePopupComponent,
    DictionaryDeleteDialogComponent,
    dictionaryRoute,
    dictionaryPopupRoute,
    DictionaryResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...dictionaryRoute,
    ...dictionaryPopupRoute,
];

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DictionaryComponent,
        DictionaryDetailComponent,
        DictionaryDialogComponent,
        DictionaryDeleteDialogComponent,
        DictionaryPopupComponent,
        DictionaryDeletePopupComponent,
    ],
    entryComponents: [
        DictionaryComponent,
        DictionaryDialogComponent,
        DictionaryPopupComponent,
        DictionaryDeleteDialogComponent,
        DictionaryDeletePopupComponent,
    ],
    providers: [
        DictionaryService,
        DictionaryPopupService,
        DictionaryResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebDictionaryModule {}
