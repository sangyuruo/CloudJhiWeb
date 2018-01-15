import { BaseEntity } from './../../shared';

export class Company implements BaseEntity {
    constructor(
        public id?: number,
        public companyLongName?: string,
        public companyName?: string,
        public parentCompanyName?: string,
        public companyCode?: string,
        public countryCode?: string,
        public cityCode?: string,
        public addressCode?: string,
        public addressName?: string,
        public telephone?: string,
        public legalPerson?: string,
        public parentCompanyCode?: string,
        public levelId?: number,
        public remark?: string,
        public attachsNum?: number,
        public seqNo?: number,
        public enable?: boolean,
        public createdBy?: string,
        public createTime?: any,
        public updatedBy?: string,
        public updateTime?: any,
    ) {
        this.enable = false;
    }
}
