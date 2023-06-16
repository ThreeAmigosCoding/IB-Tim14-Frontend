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

    flag0: boolean = true;
    flag1: boolean = true;
    flag2: boolean = true;
    flag3: boolean = true;
    flag4: boolean = true;
    flag5: boolean = true;
    flag6: boolean = true;
    flag7: boolean = true;
    flag8: boolean = true;


    constructor(private requestService: RequestService, private authService: AuthService) {
    }

    ngOnInit() {

    }

    addCertificate() {
        if (this.selectedType != 'ROOT') {
            if (!this.addCertificateForm.valid) {
                alert("Form is not valid. Enter issuer serial number.")
                return;
            }
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

        if (this.flag0) {
            selectedFlags.push("0");
        }
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
        if (this.flag8) {
            selectedFlags.push("8");
        }

        if (selectedFlags.length == 0)
            return "";

        alert(selectedFlags);

        return selectedFlags.join(",");
    }

}
