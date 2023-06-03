import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-two-step-auth',
  templateUrl: './two-step-auth.component.html',
  styleUrls: ['./two-step-auth.component.css']
})
export class TwoStepAuthComponent {

    twoStepAuthForm = new FormGroup({
        code: new FormControl(0, [Validators.required])
    });

    constructor(
        public dialogRef: MatDialogRef<TwoStepAuthComponent>,
        private authService : AuthService,
        private router : Router,
        @Inject(MAT_DIALOG_DATA) private data: any
    ) { }

    confirm(): void {
        this.authService.twoStepAuthentication(this.data.email, this.twoStepAuthForm.value.code).subscribe({
            next: (result) => {
                localStorage.setItem('user', JSON.stringify(result));
                this.authService.setUserLogged();
                this.router.navigate(['home']);
                this.dialogRef.close();
            }, error: err => {
                alert(err.error.message);
            }
        });
    }
}
