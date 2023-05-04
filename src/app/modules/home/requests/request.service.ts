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

  public createRequest(certificateRequest: CertificateRequest): Observable<CertificateRequest[]> {
      return this.http.post<CertificateRequest[]>(environment.apiHost + "certificate/create-request", certificateRequest);
  }

  public getAllRequests(): Observable<CertificateRequest[]> {
    return this.http.get<CertificateRequest[]>(environment.apiHost + "certificate/certificate-requests");
  }

  public getPersonalRequests(userID: number): Observable<CertificateRequest[]> {
    return this.http.get<CertificateRequest[]>(environment.apiHost + "certificate/certificate-requests/" + userID);
  }

  public createCertificate(userId: number, requestId: number) : Observable<any> {
    return this.http.post<any>(environment.apiHost + "certificate/create-certificate/" + userId + "/" + requestId, userId);
  }

  public rejectCertificate(userId: number, requestId: number) : Observable<any> {
    return this.http.put<any>(environment.apiHost + "certificate/reject-certificate/" + userId + "/" + requestId, userId);
  }
}

