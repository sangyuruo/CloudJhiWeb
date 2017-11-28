import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Area } from './area.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AreaService {

    private resourceUrl = '/emcloudloc/api/areas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(area: Area): Observable<Area> {
        const copy = this.convert(area);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(area: Area): Observable<Area> {
        const copy = this.convert(area);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Area> {
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
     * Convert a returned JSON object to Area.
     */
    private convertItemFromServer(json: any): Area {
        const entity: Area = Object.assign(new Area(), json);
        entity.createTime = this.dateUtils
            .convertDateTimeFromServer(json.createTime);
        entity.updateTime = this.dateUtils
            .convertDateTimeFromServer(json.updateTime);
        return entity;
    }

    /**
     * Convert a Area to a JSON which can be sent to the server.
     */
    private convert(area: Area): Area {
        const copy: Area = Object.assign({}, area);

        copy.createTime = this.dateUtils.toDate(area.createTime);

        copy.updateTime = this.dateUtils.toDate(area.updateTime);
        return copy;
    }
}
