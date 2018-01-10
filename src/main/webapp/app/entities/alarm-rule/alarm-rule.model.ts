import { BaseEntity } from './../../shared';

export class AlarmRule implements BaseEntity {
    constructor(
        public id?: number,
        public ruleName?: string,
        public ruleCode?: string,
        public ruleType?: string,
        public alarmLevel?: number,
        public enable?: boolean,
        public createdBy?: string,
        public createTime?: any,
        public updatedBy?: string,
        public updateTime?: any,
        public ruleAttributes?: BaseEntity[],
    ) {
        this.enable = false;
    }
}
