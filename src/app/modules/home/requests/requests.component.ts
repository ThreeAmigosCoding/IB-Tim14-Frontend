import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/service/auth.service";
import {RequestService} from "./request.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit{

  role: any;
  userId: any;

  // certificate: CertificateRequest = {
  //   id: 1,
  //   signatureAlgorithm: "SHA-256",
  //   issuerId: 123,
  //   issuerSerialNumber: "",
  //   requestDate: new Date("2022-04-29"),
  //   type: CertificateType.END,
  //   ownerId: 456,
  //   approved: true,
  //   flags: "some flags"
  // };

  // certificateRequests: CertificateRequest[] = [this.certificate];
  pendingRequests: CertificateRequest[] = []
  pendingIssuerRequests: CertificateRequest[] = []
  approvedRequests: CertificateRequest[] = []
  rejectedRequests: CertificateRequest[] = []

  constructor(private authService: AuthService, private requestService: RequestService){}

  ngOnInit(): void {
    this.authService.userLoggedState$.subscribe( result => {
      this.role = result;
      this.userId = this.authService.getUserId();
      if (this.role == "ROLE_ADMIN") {
        this.loadAll();
      }
      else {
        this.loadPersonal();
      }
    });
  }

  protected readonly length = length;

  loadAll() {
    this.requestService.getAllRequests().subscribe(result => {
      for (let req of result) {
        if (req.approved == null)
          this.pendingRequests.push(req);
        else if (req.approved)
          this.approvedRequests.push(req);
        else
          this.rejectedRequests.push(req);

      }
    })
  }

  loadPersonal() {
    this.requestService.getPersonalRequests(this.authService.getUserId()).subscribe(result => {
      for (let req of result) {
        if (req.approved == null)
          this.pendingRequests.push(req);
        else if (req.approved)
          this.approvedRequests.push(req);
        else
          this.rejectedRequests.push(req);
      }
    })
    this.requestService.getAllRequests().subscribe(result => {
      for (let req of result) {
          if (req.issuerOwnerId == this.authService.getUserId() && req.approved == null)
              this.pendingRequests.push(req);

      }
    })
  }

  acceptRequest(id: number, index: number) {
    this.requestService.createCertificate(this.authService.getUserId(), id).subscribe(
      {
        next: (response) => {
          this.approvedRequests.push(this.pendingRequests[index]);
          this.pendingRequests.splice(index, 1);
          alert("Certificate created successfully!")
        },
        error: (error) => {
          console.error('An error occurred:', error);
        },
        complete: () => {
          // handle completion of observable (optional)
        }
      }
    )
  }

  declineRequest(id: number, index: number) {
    this.requestService.rejectCertificate(this.authService.getUserId(), id).subscribe(
      {
        next: (response) => {
          this.rejectedRequests.push(this.pendingRequests[index]);
          this.pendingRequests.splice(index, 1);
          alert("Certificate request rejected!")
        },
        error: (error) => {
          console.error('An error occurred:', error);
        },
        complete: () => {
          // handle completion of observable (optional)
        }
      }
    )
  }
}

export interface CertificateRequest {
  id: number;
  signatureAlgorithm: string;
  issuerId: number;
  issuerOwnerId: number;
  issuerSerialNumber: string;
  requestDate: Date;
  type: CertificateType;
  ownerId: number;
  ownerName: string;
  approved: boolean;
  flags: string;
}

export enum CertificateType {
  ROOT = 'ROOT',
  INTERMEDIATE = 'INTERMEDIATE',
  END = 'END'
}
