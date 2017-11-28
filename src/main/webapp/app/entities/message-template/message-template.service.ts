import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { MessageTemplate } from './message-template.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MessageTemplateService {

    private resourceUrl = '/emcloudnfs/api/message-templates';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(messageTemplate: MessageTemplate): Observable<MessageTemplate> {
        const copy = this.convert(messageTemplate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(messageTemplate: MessageTemplate): Observable<MessageTemplate> {
        const copy = this.convert(messageTemplate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MessageTemplate> {
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
     * Convert a returned JSON object to MessageTemplate.
     */
    private convertItemFromServer(json: any): MessageTemplate {
        const entity: MessageTemplate = Object.assign(new MessageTemplate(), json);
        entity.createTime = this.dateUtils
            .convertDateTimeFromServer(json.createTime);
        entity.updateTime = this.dateUtils
            .convertDateTimeFromServer(json.updateTime);
        return entity;
    }

    /**
     * Convert a MessageTemplate to a JSON which can be sent to the server.
     */
    private convert(messageTemplate: MessageTemplate): MessageTemplate {
        const copy: MessageTemplate = Object.assign({}, messageTemplate);

        copy.createTime = this.dateUtils.toDate(messageTemplate.createTime);

        copy.updateTime = this.dateUtils.toDate(messageTemplate.updateTime);
        return copy;
    }
}
