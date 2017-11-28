import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { DictionaryClassify } from './dictionary-classify.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DictionaryClassifyService {

    private resourceUrl = '/emclouddict/api/dictionary-classifies';

    constructor(private http: Http) { }

    create(dictionaryClassify: DictionaryClassify): Observable<DictionaryClassify> {
        const copy = this.convert(dictionaryClassify);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dictionaryClassify: DictionaryClassify): Observable<DictionaryClassify> {
        const copy = this.convert(dictionaryClassify);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<DictionaryClassify> {
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
     * Convert a returned JSON object to DictionaryClassify.
     */
    private convertItemFromServer(json: any): DictionaryClassify {
        const entity: DictionaryClassify = Object.assign(new DictionaryClassify(), json);
        return entity;
    }

    /**
     * Convert a DictionaryClassify to a JSON which can be sent to the server.
     */
    private convert(dictionaryClassify: DictionaryClassify): DictionaryClassify {
        const copy: DictionaryClassify = Object.assign({}, dictionaryClassify);
        return copy;
    }
}
