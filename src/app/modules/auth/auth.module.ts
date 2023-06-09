import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule} from "@angular/common/http";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {MatDialogModule} from "@angular/material/dialog";
import { TwoStepAuthComponent } from './two-step-auth/two-step-auth.component';
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    TwoStepAuthComponent
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
        HttpClientModule,
        MatDialogModule,
        GoogleSigninButtonModule
    ]
})
export class AuthModule { }
