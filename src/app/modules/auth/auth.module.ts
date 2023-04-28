import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
    exports: [
        LoginComponent,
        RegisterComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule
  ]
})
export class AuthModule { }
