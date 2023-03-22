import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  hide: boolean = true;

  constructor() {
  }

  loginForm = new FormGroup({
    mail: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(3), Validators.required]),
  });

  ngOnInit(): void {
  }

  logIn() {

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
