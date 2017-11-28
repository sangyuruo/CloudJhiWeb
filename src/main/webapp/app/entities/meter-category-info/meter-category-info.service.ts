import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { MeterCategoryInfo } from './meter-category-info.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MeterCategoryInfoService {

    private resourceUrl = '/emcloudmi/api/meter-category-infos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(meterCategoryInfo: MeterCategoryInfo): Observable<MeterCategoryInfo> {
        const copy = this.convert(meterCategoryInfo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(meterCategoryInfo: MeterCategoryInfo): Observable<MeterCategoryInfo> {
        const copy = this.convert(meterCategoryInfo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MeterCategoryInfo> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to MeterCategoryInfo.
     */
    private convertItemFromServer(json: any): MeterCategoryInfo {
        const entity: MeterCategoryInfo = Object.assign(new MeterCategoryInfo(), json);
        entity.createTime = this.dateUtils
            .convertDateTimeFromServer(json.createTime);
        entity.updateTime = this.dateUtils
            .convertDateTimeFromServer(json.updateTime);
        return entity;
    }

    /**
     * Convert a MeterCategoryInfo to a JSON which can be sent to the server.
     */
    private convert(meterCategoryInfo: MeterCategoryInfo): MeterCategoryInfo {
        const copy: MeterCategoryInfo = Object.assign({}, meterCategoryInfo);

        copy.createTime = this.dateUtils.toDate(meterCategoryInfo.createTime);

        copy.updateTime = this.dateUtils.toDate(meterCategoryInfo.updateTime);
        return copy;
    }
}
