import { BaseEntity } from './../../shared';

export class MessageTemplate implements BaseEntity {
    constructor(
        public id?: number,
        public mtCode?: string,
        public content?: string,
        public paramFlag?: boolean,
        public type?: number,
        public smsSendChannel?: string,
        public remark?: string,
        public enable?: boolean,
        public createdBy?: string,
        public createTime?: any,
        public updatedBy?: string,
        public updateTime?: any,
    ) {
        this.paramFlag = false;
        this.enable = false;
    }
}
