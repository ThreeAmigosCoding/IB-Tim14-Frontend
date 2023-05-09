import {Component, OnInit} from '@angular/core';
import {CertificateRequest} from "../requests/requests.component";
import {AuthService} from "../../auth/service/auth.service";
import {RevocationRequest} from "../revocation-reason/revocation-reason.component";
import {RequestService} from "../requests/request.service";

@Component({
  selector: 'app-revoke-requests',
  templateUrl: './revoke-requests.component.html',
  styleUrls: ['./revoke-requests.component.css']
})
export class RevokeRequestsComponent implements OnInit{

    role: any;
    userId: any;

    pendingRequests: RevocationRequest[] = []
    approvedRequests: RevocationRequest[] = []
    rejectedRequests: RevocationRequest[] = []

    constructor(private authService: AuthService, private requestService: RequestService) {
    }

    ngOnInit() {
        this.role = this.authService.getRole();
        this.userId = this.authService.getUserId();
        this.getRequests(this.userId);
    }

    getRequests(userID: number) {
        this.requestService.getRevocationRequests(userID).subscribe(result => {
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
        this.requestService.acceptRevocationRequest(id, this.userId).subscribe(
            {
                next: (response) => {
                    this.approvedRequests.push(this.pendingRequests[index]);
                    this.pendingRequests.splice(index, 1);
                    alert("Certificate revoked successfully!")
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
        this.requestService.rejectRevocationRequest(id, this.userId).subscribe(
            {
                next: (response) => {
                    this.rejectedRequests.push(this.pendingRequests[index]);
                    this.pendingRequests.splice(index, 1);
                    alert("Certificate revocation rejected!")
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
