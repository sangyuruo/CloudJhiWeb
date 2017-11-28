import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmCloudWebSharedModule } from '../../shared';
import {
    DictionaryClassifyService,
    DictionaryClassifyPopupService,
    DictionaryClassifyComponent,
    DictionaryClassifyDetailComponent,
    DictionaryClassifyDialogComponent,
    DictionaryClassifyPopupComponent,
    DictionaryClassifyDeletePopupComponent,
    DictionaryClassifyDeleteDialogComponent,
    dictionaryClassifyRoute,
    dictionaryClassifyPopupRoute,
    DictionaryClassifyResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...dictionaryClassifyRoute,
    ...dictionaryClassifyPopupRoute,
];

@NgModule({
    imports: [
        EmCloudWebSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DictionaryClassifyComponent,
        DictionaryClassifyDetailComponent,
        DictionaryClassifyDialogComponent,
        DictionaryClassifyDeleteDialogComponent,
        DictionaryClassifyPopupComponent,
        DictionaryClassifyDeletePopupComponent,
    ],
    entryComponents: [
        DictionaryClassifyComponent,
        DictionaryClassifyDialogComponent,
        DictionaryClassifyPopupComponent,
        DictionaryClassifyDeleteDialogComponent,
        DictionaryClassifyDeletePopupComponent,
    ],
    providers: [
        DictionaryClassifyService,
        DictionaryClassifyPopupService,
        DictionaryClassifyResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebDictionaryClassifyModule {}
