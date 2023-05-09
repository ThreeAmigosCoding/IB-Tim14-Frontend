import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {LayoutModule} from "../layout/layout.module";
import { RequestsComponent } from './requests/requests.component';
import { CertificatesComponent } from './certificates/certificates.component';
import {MatInputModule} from "@angular/material/input";
import { AddCertificateComponent } from './add-certificate/add-certificate.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { RevocationReasonComponent } from './revocation-reason/revocation-reason.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    HomeScreenComponent,
    RequestsComponent,
    CertificatesComponent,
    AddCertificateComponent,
    RevocationReasonComponent
  ],
    imports: [
        CommonModule,
        LayoutModule,
        MatInputModule,
        ReactiveFormsModule,
        MatListModule,
        FormsModule,
        MatCheckboxModule,
        MatDialogModule,
        MatButtonModule
    ]

})
export class HomeModule { }
