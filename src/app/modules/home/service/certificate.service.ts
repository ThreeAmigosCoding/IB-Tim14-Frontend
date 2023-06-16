import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Certificate} from "../certificates/certificates.component";
import {environment} from "../../../../environments/environment";
import {RevocationRequest} from "../revocation-reason/revocation-reason.component";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

    certificates: BehaviorSubject<Certificate[]> = new BehaviorSubject<Certificate[]>([]);
    certificatesState = this.certificates.asObservable();

    constructor(private http: HttpClient) { }

    public setCertificatesState(certificates: Certificate[]): void {
        this.certificates.next(certificates);
    }

    public getCertificates() : Observable<Certificate[]> {
        return this.http.get<Certificate[]>(environment.apiHost + 'certificate/certificates')
    }

    public downloadCertificate(alias: string, userId: number) : void {
        this.http.get(environment.apiHost + 'certificate/download/' + alias + "/" + userId, {responseType: 'blob' as 'json'})
            .subscribe((response: any) =>{
                let filename = alias + ".crt";
                let dataType = response.type;
                if (dataType === "application/zip")
                    filename = alias + ".zip";
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

    public checkCertificateValidityFromSerialNumber(serialNumber: string): Observable<string>{
        return this.http.get(environment.apiHost + "certificate/validity/" + serialNumber,
            { responseType: 'text' });
    }

    public checkCertificateValidityFromCopy(file: File): Observable<string>{
        let formData : FormData = new FormData();
        formData.append('certificate', file);
        return this.http.put(environment.apiHost + "certificate/validity", formData, {responseType:'text'});
    }

    public createRevocationRequest(userId: number, revocationRequest: RevocationRequest): Observable<RevocationRequest> {
        return this.http.post<RevocationRequest>(environment.apiHost + "certificate/revocation/create/" + userId, revocationRequest);
    }
}
