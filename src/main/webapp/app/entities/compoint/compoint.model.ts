import { BaseEntity } from './../../shared';

export class Compoint implements BaseEntity {
    constructor(
        public id?: number,
        public comPointCode?: string,
        public registerCode?: number,
        public registerName?: string,
        public addressCode?: string,
        public organizationCode?: string,
        public companyCode?: string,
        public ip?: string,
        public hostName?: string,
        public hostPort?: number,
        public requestTimeout?: number,
        public replyTimeout?: number,
        public enable?: boolean,
        public keepAlive?: boolean,
        public connectMode?: number,
        public createdBy?: string,
        public createTime?: any,
        public updatedBy?: string,
        public updateTime?: any,
    ) {
        this.enable = false;
        this.keepAlive = false;
    }
}
