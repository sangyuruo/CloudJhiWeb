import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Compoint } from './compoint.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CompointService {

    private resourceUrl = '/emcloudcpi/api/compoints';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(compoint: Compoint): Observable<Compoint> {
        const copy = this.convert(compoint);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(compoint: Compoint): Observable<Compoint> {
        const copy = this.convert(compoint);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Compoint> {
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
     * Convert a returned JSON object to Compoint.
     */
    private convertItemFromServer(json: any): Compoint {
        const entity: Compoint = Object.assign(new Compoint(), json);
        entity.createTime = this.dateUtils
            .convertDateTimeFromServer(json.createTime);
        entity.updateTime = this.dateUtils
            .convertDateTimeFromServer(json.updateTime);
        return entity;
    }

    /**
     * Convert a Compoint to a JSON which can be sent to the server.
     */
    private convert(compoint: Compoint): Compoint {
        const copy: Compoint = Object.assign({}, compoint);

        copy.createTime = this.dateUtils.toDate(compoint.createTime);

        copy.updateTime = this.dateUtils.toDate(compoint.updateTime);
        return copy;
    }
}
