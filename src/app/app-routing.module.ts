import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from "./modules/auth/login/login.component";
import { RegisterComponent} from "./modules/auth/register/register.component";
import {HomeScreenComponent} from "./modules/home/home-screen/home-screen.component";
import {RequestsComponent} from "./modules/home/requests/requests.component";
import {CertificatesComponent} from "./modules/home/certificates/certificates.component";
import {AddCertificateComponent} from "./modules/home/add-certificate/add-certificate.component";
import {RevokeRequestsComponent} from "./modules/home/revoke-requests/revoke-requests.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeScreenComponent},
  {path: 'requests', component: RequestsComponent},
  {path: 'certificates', component: CertificatesComponent},
  {path: 'add-certificate', component: AddCertificateComponent},
  {path: 'revoke-requests', component: RevokeRequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
