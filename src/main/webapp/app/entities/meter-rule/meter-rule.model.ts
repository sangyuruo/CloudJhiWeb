import { BaseEntity } from './../../shared';

export class MeterRule implements BaseEntity {
    constructor(
        public id?: number,
        public meterCode?: string,
        public meterName?: string,
        public ruleCode?: string,
        public ruleName?: string,
        public enable?: boolean,
        public createdBy?: string,
        public createTime?: any,
        public updatedBy?: string,
        public updateTime?: any,
    ) {
        this.enable = false;
    }
}
