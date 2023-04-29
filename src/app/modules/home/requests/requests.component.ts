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

  certificate: CertificateRequest = {
    id: 1,
    signatureAlgorithm: "SHA-256",
    issuerId: 123,
    requestDate: new Date("2022-04-29"),
    type: CertificateType.END,
    ownerId: 456,
    approved: true,
    flags: "some flags"
  };

  // certificateRequests: CertificateRequest[] = [this.certificate];
  pendingRequests: CertificateRequest[] = []
  approvedRequests: CertificateRequest[] = []
  rejectedRequests: CertificateRequest[] = []

  constructor(private authService: AuthService, private requestService: RequestService){}

  ngOnInit(): void {
    this.authService.userLoggedState$.subscribe( result => {
      this.role = result;
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
  }

  acceptRequest(id: number, index: number) {
    this.requestService.createCertificate(id).subscribe(
      {
        next: (response) => {
          this.approvedRequests.push(this.pendingRequests[index]);
          this.pendingRequests.splice(index);
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
    this.requestService.rejectCertificate(id).subscribe(
      {
        next: (response) => {
          this.rejectedRequests.push(this.pendingRequests[index]);
          this.pendingRequests.splice(index);
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
  requestDate: Date;
  type: CertificateType;
  ownerId: number;
  approved: boolean;
  flags: string;
}

export enum CertificateType {
  ROOT = 'ROOT',
  INTERMEDIATE = 'INTERMEDIATE',
  END = 'END'
}
