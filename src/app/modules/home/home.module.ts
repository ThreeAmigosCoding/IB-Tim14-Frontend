import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {LayoutModule} from "../layout/layout.module";
import { RequestsComponent } from './requests/requests.component';
import { CertificatesComponent } from './certificates/certificates.component';
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [
    HomeScreenComponent,
    RequestsComponent
    CertificatesComponent
  ],
    imports: [
        CommonModule,
        LayoutModule,
        MatInputModule
    ]

})
export class HomeModule { }
