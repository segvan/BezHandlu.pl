import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataStoreService {

    private readonly _API_BASE_URL = 'https://bezhandlu.firebaseio.com';
    private readonly _API_SUNDAYS_ENDPOINT = '/sundays';
    private readonly _API_SUFFIX = '.json';

    constructor(private http: HttpClient) {
    }

    getByDate(date: Date) {
        const url =
            this._API_BASE_URL +
            `${this._API_SUNDAYS_ENDPOINT}/` +
            `${date.getFullYear()}/monthes/` +
            `${date.getMonth() + 1}/days/` +
            `${date.getDate()}` +
            this._API_SUFFIX;

        return this.http.get(url);
    }

    getAll() {
        const url =
            this._API_BASE_URL +
            `${this._API_SUNDAYS_ENDPOINT}` +
            this._API_SUFFIX;

        return this.http.get(url);
    }
}
