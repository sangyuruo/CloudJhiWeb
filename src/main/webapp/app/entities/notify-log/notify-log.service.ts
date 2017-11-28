import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { NotifyLog } from './notify-log.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class NotifyLogService {

    private resourceUrl = '/emcloudnfs/api/notify-logs';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(notifyLog: NotifyLog): Observable<NotifyLog> {
        const copy = this.convert(notifyLog);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(notifyLog: NotifyLog): Observable<NotifyLog> {
        const copy = this.convert(notifyLog);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<NotifyLog> {
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
     * Convert a returned JSON object to NotifyLog.
     */
    private convertItemFromServer(json: any): NotifyLog {
        const entity: NotifyLog = Object.assign(new NotifyLog(), json);
        entity.createTime = this.dateUtils
            .convertDateTimeFromServer(json.createTime);
        entity.updateTime = this.dateUtils
            .convertDateTimeFromServer(json.updateTime);
        return entity;
    }

    /**
     * Convert a NotifyLog to a JSON which can be sent to the server.
     */
    private convert(notifyLog: NotifyLog): NotifyLog {
        const copy: NotifyLog = Object.assign({}, notifyLog);

        copy.createTime = this.dateUtils.toDate(notifyLog.createTime);

        copy.updateTime = this.dateUtils.toDate(notifyLog.updateTime);
        return copy;
    }
}
