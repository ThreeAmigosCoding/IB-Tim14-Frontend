import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LoginCredentials} from "../model";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  hide: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
  }

  loginForm = new FormGroup({
    mail: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(3), Validators.required]),
  });

  ngOnInit(): void {
  }

  logIn() {
    let email = this.loginForm.value.mail;
    let password = this.loginForm.value.password;

    if (this.loginForm.valid && email !== null && email !== undefined && password !== null && password !== undefined){
      let loginCredentials : LoginCredentials = {
        email: email,
        password: password
      }
      this.authService.login(loginCredentials).subscribe({
        next: (result) => {
          localStorage.setItem('user', JSON.stringify(result));
          this.authService.setUserLogged();
          this.router.navigate(['home']);
        },
        error: (error) => {
          alert("Login failed!");
        }
      });
    } else {
      alert("Form is invalid!");
    }

  }

  changePasswordState(){
    this.hide = !this.hide;
  }

  // generateErrString(errors: ValidationErrors | null | undefined, minmax: number = 0): string{
  //   if (errors != undefined) return this.validatorErrService.generateErrorString(errors, minmax);
  //
  //   return "";
  // }

}
