import { BaseEntity } from './../../shared';

export class Organization implements BaseEntity {
    constructor(
        public id?: number,
        public orgCode?: string,
        public orgName?: string,
        public orgType?: string,
        public companyCode?: string,
        public parentCode?: string,
        public telephone?: string,
        public companyName?: string,
        public parentOrgName?: string,
        public addressName?: string,
        public addressCode?: string,
        public remark?: string,
        public seqNo?: number,
        public attachsNum?: number,
        public enable?: boolean,
        public createdBy?: string,
        public createTime?: any,
        public updatedBy?: string,
        public updateTime?: any,
        public company?: BaseEntity,
    ) {
        this.enable = false;
    }
}
