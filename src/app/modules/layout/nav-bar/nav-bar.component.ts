import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  role: any;

  constructor(private router: Router, private authService: AuthService){

  }

  ngOnInit() {
    this.authService.userLoggedState$.subscribe( result => {
      this.role = result;
    });
  }

  signIn(){
    this.router.navigate(['login'])
  }

  register(){
    this.router.navigate(['register'])
  }

  goHome() {
    this.router.navigate(['home']);
  }

  logout() {
    this.authService.logout();
  }

  requestsOverview() {
    this.router.navigate(['requests']);
  }
  
  certificates(): void {
    this.router.navigate(['certificates']);
  }
}
