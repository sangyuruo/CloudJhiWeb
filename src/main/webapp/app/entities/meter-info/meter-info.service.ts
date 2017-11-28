import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { MeterInfo } from './meter-info.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MeterInfoService {

    private resourceUrl = '/emcloudmi/api/meter-infos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(meterInfo: MeterInfo): Observable<MeterInfo> {
        const copy = this.convert(meterInfo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(meterInfo: MeterInfo): Observable<MeterInfo> {
        const copy = this.convert(meterInfo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MeterInfo> {
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
     * Convert a returned JSON object to MeterInfo.
     */
    private convertItemFromServer(json: any): MeterInfo {
        const entity: MeterInfo = Object.assign(new MeterInfo(), json);
        entity.createTime = this.dateUtils
            .convertDateTimeFromServer(json.createTime);
        entity.updateTime = this.dateUtils
            .convertDateTimeFromServer(json.updateTime);
        return entity;
    }

    /**
     * Convert a MeterInfo to a JSON which can be sent to the server.
     */
    private convert(meterInfo: MeterInfo): MeterInfo {
        const copy: MeterInfo = Object.assign({}, meterInfo);

        copy.createTime = this.dateUtils.toDate(meterInfo.createTime);

        copy.updateTime = this.dateUtils.toDate(meterInfo.updateTime);
        return copy;
    }
}
