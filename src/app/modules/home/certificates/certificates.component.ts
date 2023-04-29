import {Component, OnInit} from '@angular/core';
import {CertificateService} from "../service/certificate.service";

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit{

    certificates: Certificate[] = [];

    validCertificates: Certificate[] = [];

    invalidCertificates: Certificate[] = [];

    constructor(private certificateService: CertificateService) {
    }

    ngOnInit(): void {
        this.certificateService.getCertificates().subscribe({
                next: result => {
                    this.validCertificates = result.filter((certificate) => {
                        return certificate.valid;
                    });
                    this.invalidCertificates = result.filter((certificate) => {
                        return !certificate.valid;
                    });
                },
                error: err => {
                    alert(err.message);
                }
            }
        );
    }

    public download(alias: string): void {
        this.certificateService.downloadCertificate(alias).subscribe({
                error: err => {
                    alert(err.message);
                }
            }
        )
    }

}

export interface Certificate {
    serialNumber: number;
    signatureAlgorithm: string;
    issuerAlias: string;
    validFrom: Date;
    validTo: Date;
    valid: Boolean;
    type: string;
    owner: User;
    alias: string;
    flags: string;
}

export interface User {
    name: string;
    surname: string;
    telephoneNumber: string;
    email: string;
    address: string;
}
