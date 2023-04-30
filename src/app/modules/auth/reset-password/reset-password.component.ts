import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
    emailSent: boolean = false;
    hideNewPassword = true
    hideConfirmPassword = true

    validatePasswordMatch = (control: AbstractControl): {[key: string]: any} | null => {
        const password = this.resetPasswordForm?.get('newPassword')?.value as string;
        const passwordConfirm = control.value as string;

        if (password !== passwordConfirm) {
            return {passwordMatch: true};
        }

        return null;
    };

    email: string | null | undefined ="";
    resetPasswordForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        code: new FormControl(0, [Validators.required]),
        newPassword: new FormControl('', [Validators.minLength(3), Validators.required]),
        confirmPassword: new FormControl('', [Validators.required, this.validatePasswordMatch])
    });

    constructor(
        public dialogRef: MatDialogRef<ResetPasswordComponent>,
        private authService : AuthService,
        private router : Router
    ) { }

    onCancelClick() {
        this.dialogRef.close();
    }

    changeNewPasswordState() {
        this.hideNewPassword = !this.hideNewPassword;
    }

    changeConfirmPasswordState() {
        this.hideConfirmPassword = !this.hideConfirmPassword;
    }

    reset() {
        console.log(this.resetPasswordForm.valid)
        if (!this.resetPasswordForm.valid) return;

        let passwordReset: PasswordReset = {
            newPassword: this.resetPasswordForm.value.newPassword as string,
            code: this.resetPasswordForm.value.code as number}

        this.authService.resetPassword(this.email, passwordReset).subscribe({
            next: () => {
                alert("Password successfully reset!");
                this.onCancelClick();
            }, error: err => {
                alert(err.error)
            }
        });
    }

    sendEmail() {
        if (!this.resetPasswordForm.get('email')?.valid) return;
        if (this.resetPasswordForm.value.email === null || this.resetPasswordForm.value.email === undefined) return;

        this.authService.sendResetEmail(this.resetPasswordForm.value.email).subscribe({
            next: () => {
                this.emailSent = true;
                this.email = this.resetPasswordForm.value.email;
                this.resetPasswordForm.get('email')?.disable();
                alert("An email with the reset code has been sent!");
            }, error: err => {
                alert(err.error)
            }
        });
    }

}

export interface PasswordReset{
    newPassword: string;
    code: number;
}
