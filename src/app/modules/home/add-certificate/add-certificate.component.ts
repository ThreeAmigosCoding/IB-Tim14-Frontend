import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CertificateRequest, CertificateType} from "../requests/requests.component";
import {RequestService} from "../requests/request.service";
import {AuthService} from "../../auth/service/auth.service";

@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.css']
})
export class AddCertificateComponent implements OnInit{


    selectedAlgorithm: string = "SHA256withRSA"
    selectedType: string = "END"
    serialNumber: string = "";

    addCertificateForm = new FormGroup({
        issuerSerialNumber: new FormControl('', [ Validators.required])
    });
    flag1: any;
    flag2: any;
    flag3: any;
    flag4: any;
    flag5: any;
    flag6: any;
    flag7: any;

    constructor(private requestService: RequestService, private authService: AuthService) {
    }

    ngOnInit() {

    }

    addCertificate() {
        if (this.selectedType != 'ROOT') {
            if (!this.addCertificateForm.valid) {
                return;
            }
        }
        else {
            this.serialNumber = "";
        }

        let flagsString = this.getSelectedFlags();

        let certificateRequest: CertificateRequest = {
            id: 0,
            signatureAlgorithm: this.selectedAlgorithm,
            issuerId: 123,
            issuerOwnerId: 123,
            issuerSerialNumber: this.serialNumber,
            requestDate: new Date(),
            type: CertificateType[this.selectedType as keyof typeof CertificateType],
            ownerId: this.authService.getUserId(),
            ownerName: "test",
            approved: false,
            flags: flagsString
        };

        this.requestService.createRequest(certificateRequest).subscribe({
            next: () => {
                alert("Certificate request has been created successfully!");
            },
            error: err => {
                alert(err.error);
            }
        })


    }

    changeSelectedAlgorithm(option:string): void{
        this.selectedAlgorithm = option;
    }

    changeSelectedType(option:string): void{
        this.selectedType = option;
    }

    getSelectedFlags(): string {
        let selectedFlags = [];

        if (this.flag1) {
            selectedFlags.push("1");
        }
        if (this.flag2) {
            selectedFlags.push("2");
        }
        if (this.flag3) {
            selectedFlags.push("3");
        }
        if (this.flag4) {
            selectedFlags.push("4");
        }
        if (this.flag5) {
            selectedFlags.push("5");
        }
        if (this.flag6) {
            selectedFlags.push("6");
        }
        if (this.flag7) {
            selectedFlags.push("7");
        }

        if (selectedFlags.length == 0)
            return "";

        return selectedFlags.join(",");
    }

}
