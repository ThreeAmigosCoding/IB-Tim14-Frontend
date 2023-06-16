import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Certificate} from "../certificates/certificates.component";
import {CertificateService} from "../service/certificate.service";
import {AuthService} from "../../auth/service/auth.service";

@Component({
  selector: 'app-revocation-reason',
  templateUrl: './revocation-reason.component.html',
  styleUrls: ['./revocation-reason.component.css']
})
export class RevocationReasonComponent {
    revocationReasonForm = new FormGroup({
        reason: new FormControl('', [Validators.required])
    });

    constructor(public dialogRef: MatDialogRef<RevocationReasonComponent>,
                @Inject(MAT_DIALOG_DATA) public certificate: Certificate,
                private certificateService: CertificateService,
                private authService: AuthService) {
    }

    createRevocationRequest() {
        if (!this.revocationReasonForm.valid) return;

        let revocationRequest: RevocationRequest = {
            approved: null,
            id: null,
            issuerId: 0,
            reason: this.revocationReasonForm.value.reason,
            requestDate: new Date(),
            revocationCertificateId: 0,
            revocationCertificateSerialNumber: this.certificate.serialNumber
        }
        this.certificateService.createRevocationRequest(this.authService.getUserId(), revocationRequest).subscribe({
            next: () => {
                alert("Revocation requests created successfully!")
                this.dialogRef.close();
                this.certificateService.getCertificates().subscribe({
                    next: result => {
                        this.certificateService.setCertificatesState(result);
                    }, error: err => {
                        alert(err.error)
                    }
                })
            }, error: err => {
                alert(err.error)
            }
        })
    }

}

export interface RevocationRequest {
    id: any;
    issuerId: number;
    revocationCertificateId: number;
    reason: string | null | undefined;
    requestDate: Date;
    approved: boolean | null;
    revocationCertificateSerialNumber: string;
}
