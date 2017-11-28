import { BaseEntity } from './../../shared';

export class Address implements BaseEntity {
    constructor(
        public id?: number,
        public addressName?: string,
        public addressCode?: string,
        public longitude?: number,
        public latitude?: number,
        public areaCode?: string,
        public enable?: boolean,
        public createdBy?: string,
        public createTime?: any,
        public updatedBy?: string,
        public updateTime?: any,
        public area?: BaseEntity,
    ) {
        this.enable = false;
    }
}
