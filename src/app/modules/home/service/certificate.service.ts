import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Certificate} from "../certificates/certificates.component";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

    certificates: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    certificatesState: Observable<any> = this.certificates.asObservable();

    constructor(private http: HttpClient) { }

    public setCertificatesState(certificates: Certificate[]): void {
        this.certificates.next(certificates);
    }

    public getCertificates() : Observable<Certificate[]> {
        return this.http.get<Certificate[]>(environment.apiHost + 'certificate/certificates')
    }

    public downloadCertificate(alias: string) : Observable<any> {
        return this.http.get<any>(environment.apiHost + 'certificate/download/' + alias);
    }
}
