import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { MultiwaySwitchInfo } from './multiway-switch-info.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MultiwaySwitchInfoService {

    private resourceUrl = '/emcloudmi/api/multiway-switch-infos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(multiwaySwitchInfo: MultiwaySwitchInfo): Observable<MultiwaySwitchInfo> {
        const copy = this.convert(multiwaySwitchInfo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(multiwaySwitchInfo: MultiwaySwitchInfo): Observable<MultiwaySwitchInfo> {
        const copy = this.convert(multiwaySwitchInfo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MultiwaySwitchInfo> {
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
     * Convert a returned JSON object to MultiwaySwitchInfo.
     */
    private convertItemFromServer(json: any): MultiwaySwitchInfo {
        const entity: MultiwaySwitchInfo = Object.assign(new MultiwaySwitchInfo(), json);
        entity.createTime = this.dateUtils
            .convertDateTimeFromServer(json.createTime);
        entity.updateTime = this.dateUtils
            .convertDateTimeFromServer(json.updateTime);
        return entity;
    }

    /**
     * Convert a MultiwaySwitchInfo to a JSON which can be sent to the server.
     */
    private convert(multiwaySwitchInfo: MultiwaySwitchInfo): MultiwaySwitchInfo {
        const copy: MultiwaySwitchInfo = Object.assign({}, multiwaySwitchInfo);

        copy.createTime = this.dateUtils.toDate(multiwaySwitchInfo.createTime);

        copy.updateTime = this.dateUtils.toDate(multiwaySwitchInfo.updateTime);
        return copy;
    }
}
