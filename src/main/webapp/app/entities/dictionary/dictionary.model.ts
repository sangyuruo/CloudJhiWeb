import { BaseEntity } from './../../shared';

export class Dictionary implements BaseEntity {
    constructor(
        public id?: number,
        public dictName?: string,
        public dictCode?: string,
        public startTime?: any,
        public endTime?: any,
        public seqNo?: number,
        public attr1?: string,
        public attr2?: string,
        public attr3?: string,
        public attr4?: string,
        public attr5?: string,
        public attr6?: number,
        public attr7?: number,
        public attr8?: number,
        public attr9?: number,
        public attr10?: number,
        public dictionaryClassifies?: BaseEntity[],
    ) {
    }
}
