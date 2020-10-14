import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  headersObject;

  constructor(private http: HttpClient) {
    //let token = localStorage.getItem('accessToken') || null;
    //this.headersObject = new HttpHeaders().set("Authorization", "Bearer " + token);
  }

  getRequest(url){
    return this.http.get(environment.apiUrl + url, { headers: this.headersObject });
  }

  deleteRequest(url){
    return this.http.delete(environment.apiUrl + url, { headers: this.headersObject });
  }

  postRequest(url, data){
    return this.http.post(environment.apiUrl + url, data, { headers: this.headersObject });
  }

  updateRequest(url, data)
  {
    return this.http.patch(environment.apiUrl + url, data, { headers: this.headersObject });
  }



}
