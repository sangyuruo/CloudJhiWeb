import { BaseEntity } from './../../shared';

export class NotifyLog implements BaseEntity {
    constructor(
        public id?: number,
        public mtid?: number,
        public sendType?: number,
        public sendTarget?: string,
        public content?: string,
        public status?: boolean,
        public readFlag?: number,
        public createdBy?: string,
        public createTime?: any,
        public updateTime?: any,
    ) {
        this.status = false;
    }
}
