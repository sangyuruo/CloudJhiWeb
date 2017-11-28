import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { Dictionary } from './dictionary.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DictionaryService {

    private resourceUrl = '/emclouddict/api/dictionaries';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(dictionary: Dictionary): Observable<Dictionary> {
        const copy = this.convert(dictionary);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(dictionary: Dictionary): Observable<Dictionary> {
        const copy = this.convert(dictionary);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Dictionary> {
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
     * Convert a returned JSON object to Dictionary.
     */
    private convertItemFromServer(json: any): Dictionary {
        const entity: Dictionary = Object.assign(new Dictionary(), json);
        entity.startTime = this.dateUtils
            .convertDateTimeFromServer(json.startTime);
        entity.endTime = this.dateUtils
            .convertDateTimeFromServer(json.endTime);
        return entity;
    }

    /**
     * Convert a Dictionary to a JSON which can be sent to the server.
     */
    private convert(dictionary: Dictionary): Dictionary {
        const copy: Dictionary = Object.assign({}, dictionary);

        copy.startTime = this.dateUtils.toDate(dictionary.startTime);

        copy.endTime = this.dateUtils.toDate(dictionary.endTime);
        return copy;
    }
}
