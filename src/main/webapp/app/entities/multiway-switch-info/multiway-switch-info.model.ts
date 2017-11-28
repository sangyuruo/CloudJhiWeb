import { BaseEntity } from './../../shared';

export class MultiwaySwitchInfo implements BaseEntity {
    constructor(
        public id?: number,
        public meterCode?: string,
        public switchCode?: number,
        public createdBy?: string,
        public createTime?: any,
        public updatedBy?: string,
        public updateTime?: any,
        public controlCommands?: string,
    ) {
    }
}
