import { BaseEntity } from './../../shared';

export class MeterCategoryInfo implements BaseEntity {
    constructor(
        public id?: number,
        public meterName?: string,
        public meterType?: string,
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
    ) {
    }
}
