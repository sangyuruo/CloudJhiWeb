import { BaseEntity } from './../../shared';

export class RuleAttributes implements BaseEntity {
    constructor(
        public id?: number,
        public ruleCode?: string,
        public attributeName?: number,
        public attributeValue?: string,
        public createdBy?: string,
        public createTime?: any,
        public updatedBy?: string,
        public updateTime?: any,
        public alarmRule?: BaseEntity,
    ) {
    }
}
