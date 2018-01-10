import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { MeterRule } from './meter-rule.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MeterRuleService {

    private resourceUrl = '/emcloudarc/api/meter-rules';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(meterRule: MeterRule): Observable<MeterRule> {
        const copy = this.convert(meterRule);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(meterRule: MeterRule): Observable<MeterRule> {
        const copy = this.convert(meterRule);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MeterRule> {
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
     * Convert a returned JSON object to MeterRule.
     */
    private convertItemFromServer(json: any): MeterRule {
        const entity: MeterRule = Object.assign(new MeterRule(), json);
        entity.createTime = this.dateUtils
            .convertDateTimeFromServer(json.createTime);
        entity.updateTime = this.dateUtils
            .convertDateTimeFromServer(json.updateTime);
        return entity;
    }

    /**
     * Convert a MeterRule to a JSON which can be sent to the server.
     */
    private convert(meterRule: MeterRule): MeterRule {
        const copy: MeterRule = Object.assign({}, meterRule);

        copy.createTime = this.dateUtils.toDate(meterRule.createTime);

        copy.updateTime = this.dateUtils.toDate(meterRule.updateTime);
        return copy;
    }
}
