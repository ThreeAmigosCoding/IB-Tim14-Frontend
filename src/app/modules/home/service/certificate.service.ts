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

    public downloadCertificate(alias: string) : void {
        this.http.get(environment.apiHost + 'certificate/download/' + alias, {responseType: 'blob' as 'json'})
            .subscribe((response: any) =>{
                let filename = alias + ".crt";
                let dataType = response.type;
                let binaryData = [];
                binaryData.push(response);
                let downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
                if (filename)
                    downloadLink.setAttribute('download', filename);
                document.body.appendChild(downloadLink);
                downloadLink.click();
            });
    }
}
