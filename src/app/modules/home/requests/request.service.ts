import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CertificateRequest} from "./requests.component";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  public getAllRequests(): Observable<CertificateRequest[]> {
    return this.http.get<CertificateRequest[]>(environment.apiHost + "certificate/certificate-requests");
  }

  public getPersonalRequests(userID: number): Observable<CertificateRequest[]> {
    return this.http.get<CertificateRequest[]>(environment.apiHost + "certificate/certificate-requests/" + userID);
  }

  public createCertificate(id: number) : Observable<any> {
    return this.http.post<any>(environment.apiHost + "certificate/create-certificate/" + id, id);
  }

  public rejectCertificate(id: number) : Observable<any> {
    return this.http.put<any>(environment.apiHost + "certificate/reject-certificate/" + id, id);
  }
}

