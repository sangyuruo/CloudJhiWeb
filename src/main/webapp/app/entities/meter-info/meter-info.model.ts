import { BaseEntity } from './../../shared';

export class MeterInfo implements BaseEntity {
    constructor(
        public id?: number,
        public meterCode?: string,
        public meterName?: string,
        public registerCode?: number,
        public addressCode?: string,
        public organizationCode?: string,
        public companyCode?: string,
        public meterType?: string,
        public startOffset?: number,
        public numberOfRegisters?: number,
        public controlAddress?: number,
        public createdBy?: string,
        public createTime?: any,
        public updatedBy?: string,
        public updateTime?: any,
        public controlCommands?: string,
        public multiwaySwitchInfo?: BaseEntity,
        public meterCategoryInfo?: BaseEntity,
    ) {
    }
}
