import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LoginCredentials} from "../model";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {MatDialog} from "@angular/material/dialog";
import {TwoStepAuthComponent} from "../two-step-auth/two-step-auth.component";
import {reCaptchaKey} from "../../../../environments/credentials";
import {GoogleLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";

declare var grecaptcha: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    hide: boolean = true;
    siteKey: string;

    constructor(private authService: AuthService, private router: Router, public dialog: MatDialog, private socialAuthService: SocialAuthService) {
        this.siteKey = reCaptchaKey;
    }

    loginForm = new FormGroup({
    mail: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(3), Validators.required]),
    });

    ngOnInit(): void {
        grecaptcha.render('recaptcha', {
            'sitekey' : this.siteKey
        });

        this.socialAuthService.authState.subscribe((user) => {
            // this.user = user;
            // this.loggedIn = (user != null);
            this.authService.oauth({idToken: user.idToken}).subscribe();
        });
    }

    logIn() {
        let email = this.loginForm.value.mail;
        let password = this.loginForm.value.password;
        const recaptchaResponse = grecaptcha.getResponse();
        if (recaptchaResponse === "") {
            alert("Verify yourself with reCAPTCHA!");
            return;
        }
        if (this.loginForm.valid && email !== null && email !== undefined && password !== null && password !== undefined){
            let loginCredentials : LoginCredentials = {
                email: email,
                password: password
            }
            this.authService.login(loginCredentials, recaptchaResponse).subscribe({
                next: (result) => {
                    // localStorage.setItem('user', JSON.stringify(result));
                    // this.authService.setUserLogged();
                    // this.router.navigate(['home']);
                    alert("An authentication code has been sent to your email.")
                    this.dialog.open(TwoStepAuthComponent, {data: {email: email}});
                }, error: (error) => {
                    if (error.error !== null){
                        console.log(error);
                        alert(error.error.message);
                        if (error.error.message == "Your password expired!") {
                            this.forgotPassword();
                        }
                    } else {
                        alert("Login Failed!");
                    }
                }
            });
        } else {
            alert("Form is invalid!");
        }
    }

    changePasswordState(){
    this.hide = !this.hide;
    }

    forgotPassword(): void {
        this.dialog.open(ResetPasswordComponent);
    }

  // generateErrString(errors: ValidationErrors | null | undefined, minmax: number = 0): string{
  //   if (errors != undefined) return this.validatorErrService.generateErrorString(errors, minmax);
  //
  //   return "";
  // }


}
