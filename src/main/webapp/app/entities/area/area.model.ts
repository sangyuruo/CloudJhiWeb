import { BaseEntity } from './../../shared';

export class Area implements BaseEntity {
    constructor(
        public id?: number,
        public areaCode?: string,
        public areaName?: string,
        public zipCode?: string,
        public parentId?: string,
        public parentName?: string,
        public depth?: string,
        public createdBy?: string,
        public createTime?: any,
        public updatedBy?: string,
        public updateTime?: any,
    ) {
    }
}
