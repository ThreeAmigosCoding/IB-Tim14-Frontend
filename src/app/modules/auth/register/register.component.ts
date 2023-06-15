import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRegistrationData} from "../model";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {reCaptchaKey} from "../../../../environments/credentials";

declare var grecaptcha: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  hidePassword = true;
  hideConfirmPassword = true;
  siteKey: string;

  validatePasswordMatch = (control: AbstractControl): {[key: string]: any} | null => {
    const password = this.registrationForm?.get('password')?.value as string;
    const passwordConfirm = control.value as string;

    if (password !== passwordConfirm) {
      return {passwordMatch: true};
    }

    return null;
  };


  constructor(private authService: AuthService, private router: Router) {
      this.siteKey = reCaptchaKey;
  }

  ngOnInit(): void {
      grecaptcha.render('recaptcha', {
          'sitekey' : this.siteKey
      });
  }

  registrationForm = new FormGroup({
    name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$')]),
    surname: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$')]),
    address: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50),
        Validators.pattern('[a-zA-Z0-9,-/ ]+')]),
    email: new FormControl('', [
        Validators.required,
        Validators.email]),
    phone: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
        Validators.pattern('^[0-9+]+$')]),
    password: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$')]),
    confirmPassword: new FormControl('', [
        Validators.required,
        this.validatePasswordMatch])
  });

  changePasswordState(){
    this.hidePassword = !this.hidePassword;
  }

  changeConfirmPasswordState() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  register() {
      const recaptchaResponse = grecaptcha.getResponse();
      if (recaptchaResponse === "") {
          alert("Verify yourself with reCAPTCHA!");
          return;
      }
        if (this.registrationForm.valid){
          this.authService.signUp(this.generateUserData(), recaptchaResponse).subscribe({
            next: (result) =>{
              alert("Registration successful! An activation mail has been sent to your email!");
              this.router.navigate(['home']);
            },
            error: (error) => {
              alert("Registration failed!");
            }
          });
        }
  }

  generateUserData(): UserRegistrationData{
    return {
      name: this.registrationForm.value.name,
      address: this.registrationForm.value.address,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      surname: this.registrationForm.value.surname,
      telephoneNumber: this.registrationForm.value.phone
    }
  }

}
