import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sunday } from '../models/sunday.model';

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
            `${date.getFullYear()}/` +
            this.getFormatedDate(date) +
            this._API_SUFFIX;


        return this.http.get<Sunday>(url);
    }

    private getFormatedDate(date: Date): string {
        const jsonDate = date.toJSON();
        return jsonDate.split('T')[0];
    }
}