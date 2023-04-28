import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';

@NgModule()
@Injectable({providedIn: 'root'})
export class AnonymService {
    constructor(private http : HttpClient) { }

    async getFullAddress(url : string) {
        return this.http.get(url , {});
    }
    
}