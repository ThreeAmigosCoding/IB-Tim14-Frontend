import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRegistrationData} from "../model";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  hidePassword = true;
  hideConfirmPassword = true;

  validatePasswordMatch = (control: AbstractControl): {[key: string]: any} | null => {
    const password = this.registrationForm?.get('password')?.value as string;
    const passwordConfirm = control.value as string;

    if (password !== passwordConfirm) {
      return {passwordMatch: true};
    }

    return null;
  };


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  registrationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [ Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.min(3), Validators.required]),
    confirmPassword: new FormControl('', [Validators.required, this.validatePasswordMatch])
  });

  changePasswordState(){
    this.hidePassword = !this.hidePassword;
  }

  changeConfirmPasswordState() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  register() {
    if (this.registrationForm.valid){
      this.authService.signUp(this.generateUserData()).subscribe({
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
