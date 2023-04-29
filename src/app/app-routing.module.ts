import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from "./modules/auth/login/login.component";
import { RegisterComponent} from "./modules/auth/register/register.component";
import {HomeScreenComponent} from "./modules/home/home-screen/home-screen.component";
import {RequestsComponent} from "./modules/home/requests/requests.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeScreenComponent},
  {path: 'requests', component: RequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
