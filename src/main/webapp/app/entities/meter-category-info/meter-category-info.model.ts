import { BaseEntity } from './../../shared';

export class MeterCategoryInfo implements BaseEntity {
    constructor(
        public id?: number,
        public meterTypeCode?: number,
        public meterType?: string,
        public dictCode?: number,
        public dictName?: string,
        public functionCode?: string,
        public meterFactory?: string,
        public tel?: number,
        public startOffset?: number,
        public numberOfRegisters?: number,
        public controlAddress?: number,
        public createdBy?: string,
        public createTime?: any,
        public updatedBy?: string,
        public updateTime?: any,
        public controlCommands?: string,
        public longCode?: number,
        public enable?: boolean,
    ) {
        this.enable = false;
    }
}
