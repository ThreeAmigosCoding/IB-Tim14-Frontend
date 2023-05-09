import {Component, OnInit} from '@angular/core';
import {CertificateService} from "../service/certificate.service";
import {AuthService} from "../../auth/service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ResetPasswordComponent} from "../../auth/reset-password/reset-password.component";
import {RevocationReasonComponent} from "../revocation-reason/revocation-reason.component";

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit{

    certificates: Certificate[] = [];

    validCertificates: Certificate[] = [];

    invalidCertificates: Certificate[] = [];

    constructor(private certificateService: CertificateService, private authService: AuthService, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.certificateService.certificatesState.subscribe({
                next: result => {
                    this.validCertificates = result.filter((certificate) => {
                        return !certificate.revoked
                            && new Date(Date.now()) >= new Date(certificate.validFrom)
                            && new Date(Date.now()) <= new Date(certificate.validTo);
                    });
                    this.invalidCertificates = result.filter((certificate) => {
                        return certificate.revoked
                            || new Date(Date.now()) < new Date(certificate.validFrom)
                            || new Date(Date.now()) > new Date(certificate.validTo);
                    });
                },
                error: err => {
                    alert(err.message);
                }
            }
        );
        this.certificateService.getCertificates().subscribe({
            next: result => {
                this.certificateService.setCertificatesState(result);
            }, error: err => {
                alert(err.error)
            }
        })
    }

    public download(alias: string): void {
        this.certificateService.downloadCertificate(alias, this.authService.getUserId());
    }

    checkValidityFromSerialNumber(serialNumber: string): void{
        this.certificateService.checkCertificateValidityFromSerialNumber(serialNumber).subscribe({
           next: (result) => {
               alert(result);
           },
           error: (error) => {
               alert(JSON.parse(error.error).message)
           }
        });
    }

    checkValidityFromCopy($event: any) {
        let files = $event.target.files;
        if (files.length === 0) {
            return;
        }
        const fileToUpload = files.item(0);

        if (fileToUpload != null){
            this.certificateService.checkCertificateValidityFromCopy(fileToUpload).subscribe({
               next: (result) => {
                   alert(result);
               },
               error: (error) => {
                   alert(error.error);
               }
            });
        }
    }

    onFileInputClick(event: any) {
        event.target.value = null;
    }

    openRevocationDialog(certificate: Certificate) {
        this.dialog.open(RevocationReasonComponent, {data: certificate});
    }
}

export interface Certificate {
    serialNumber: string;
    signatureAlgorithm: string;
    issuerAlias: string;
    validFrom: Date;
    validTo: Date;
    revoked: Boolean;
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
