import { Injectable } from '@angular/core';
import { BaseRequestOptions, RequestOptions, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class HeadersService extends BaseRequestOptions {
  constructor() {
    super();
    this.headers.set('Content-Type', 'application/json');
  }

  merge(options?: RequestOptionsArgs): RequestOptions {
    const newOptions = super.merge(options);
    //TODO: Use AuthService to get credentials
    const credentials = JSON.parse(sessionStorage.getItem('ng-base') || localStorage.getItem('ng-base'));
    if(credentials && credentials.token){
      newOptions.headers.set('Authorization', `Beaer ${credentials.token}`);
    }
    return newOptions;
  }

}
