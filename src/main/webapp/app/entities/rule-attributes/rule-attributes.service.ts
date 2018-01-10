import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { RuleAttributes } from './rule-attributes.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RuleAttributesService {

    private resourceUrl = '/emcloudarc/api/rule-attributes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(ruleAttributes: RuleAttributes): Observable<RuleAttributes> {
        const copy = this.convert(ruleAttributes);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ruleAttributes: RuleAttributes): Observable<RuleAttributes> {
        const copy = this.convert(ruleAttributes);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RuleAttributes> {
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
     * Convert a returned JSON object to RuleAttributes.
     */
    private convertItemFromServer(json: any): RuleAttributes {
        const entity: RuleAttributes = Object.assign(new RuleAttributes(), json);
        entity.createTime = this.dateUtils
            .convertDateTimeFromServer(json.createTime);
        entity.updateTime = this.dateUtils
            .convertDateTimeFromServer(json.updateTime);
        return entity;
    }

    /**
     * Convert a RuleAttributes to a JSON which can be sent to the server.
     */
    private convert(ruleAttributes: RuleAttributes): RuleAttributes {
        const copy: RuleAttributes = Object.assign({}, ruleAttributes);

        copy.createTime = this.dateUtils.toDate(ruleAttributes.createTime);

        copy.updateTime = this.dateUtils.toDate(ruleAttributes.updateTime);
        return copy;
    }
}
