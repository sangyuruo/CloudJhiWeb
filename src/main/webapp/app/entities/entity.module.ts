import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EmCloudWebCompanyModule } from './company/company.module';
import { EmCloudWebOrganizationModule } from './organization/organization.module';
import { EmCloudWebDictionaryModule } from './dictionary/dictionary.module';
import { EmCloudWebDictionaryClassifyModule } from './dictionary-classify/dictionary-classify.module';
import { EmCloudWebAreaModule } from './area/area.module';
import { EmCloudWebAddressModule } from './address/address.module';
import { EmCloudWebCompointModule } from './compoint/compoint.module';
import { EmCloudWebMessageTemplateModule } from './message-template/message-template.module';
import { EmCloudWebNotifyLogModule } from './notify-log/notify-log.module';
import { EmCloudWebMeterCategoryInfoModule } from './meter-category-info/meter-category-info.module';
import { EmCloudWebMeterInfoModule } from './meter-info/meter-info.module';
import { EmCloudWebMultiwaySwitchInfoModule } from './multiway-switch-info/multiway-switch-info.module';
import { EmCloudWebAlarmRuleModule } from './alarm-rule/alarm-rule.module';
import { EmCloudWebRuleAttributesModule } from './rule-attributes/rule-attributes.module';
import { EmCloudWebMeterRuleModule } from './meter-rule/meter-rule.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        EmCloudWebCompanyModule,
        EmCloudWebOrganizationModule,
        EmCloudWebDictionaryModule,
        EmCloudWebDictionaryClassifyModule,
        EmCloudWebAreaModule,
        EmCloudWebAddressModule,
        EmCloudWebCompointModule,
        EmCloudWebMessageTemplateModule,
        EmCloudWebNotifyLogModule,
        EmCloudWebMeterCategoryInfoModule,
        EmCloudWebMeterInfoModule,
        EmCloudWebMultiwaySwitchInfoModule,
        EmCloudWebAlarmRuleModule,
        EmCloudWebRuleAttributesModule,
        EmCloudWebMeterRuleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmCloudWebEntityModule {}
