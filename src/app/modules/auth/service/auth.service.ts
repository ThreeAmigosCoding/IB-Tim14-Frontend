import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {LoginCredentials, MyToken, UserRegistrationData} from "../model";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {PasswordReset} from "../reset-password/reset-password.component";
import {FormControl, ɵValue} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
    });

    userLogged$ = new BehaviorSubject<any>(null);
    userLoggedState$ = this.userLogged$.asObservable();

    constructor(private http: HttpClient) {this.userLogged$.next(this.getRole()); }

    login(credentials: LoginCredentials, recaptchaResponse: string): Observable<string>{
        // return this.http.post<MyToken>(environment.apiHost + 'user/login', credentials, {
        //   headers: this.headers,
        // });
        const params = new HttpParams().set('recaptchaResponse', recaptchaResponse);
        return this.http.post<string>(environment.apiHost + 'user/login', credentials, {params});
    }

    oauth(idToken: any): Observable<any>{
        return this.http.post<any>(environment.apiHost + 'user/oauth', idToken);
    }

    twoStepAuthentication(email: string, code: ɵValue<FormControl<number | null>> | undefined): Observable<MyToken> {
        return this.http.post<MyToken>(
            environment.apiHost + 'user/two-step-authentication/' + email + "/" + code, {
          headers: this.headers,
        });
    }

    getRole(): any {
        if (this.isLoggedIn()) {
          const accessTokenString: any = localStorage.getItem('user');
          const accessToken = JSON.parse(accessTokenString);
          const helper = new JwtHelperService();
          const roles = helper.decodeToken(accessToken.accessToken).role;

          const roleNames = roles.map((obj: { name: any; }) => obj.name);

          return roleNames;
        }
        return null;
    }

    getUserId(): number{
    if (this.isLoggedIn()) {
      const accessTokenString: any = localStorage.getItem('user');
      const accessToken = JSON.parse(accessTokenString);
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken.accessToken).id;
    }
    return -1;
    }

    getUserMail(): string {
    if (this.isLoggedIn()) {
      const accessTokenString: any = localStorage.getItem('user');
      const accessToken = JSON.parse(accessTokenString);
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken.accessToken).sub;
    }
    return "";
    }

    isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
    }

    setUserLogged(): void {
        this.userLogged$.next(this.getRole());
    }

    signUp(user: UserRegistrationData, recaptchaResponse: any): Observable<UserRegistrationData>{
        const params = new HttpParams().set('recaptchaResponse', recaptchaResponse);
        return this.http.post<UserRegistrationData>(environment.apiHost + "user/register", user, {params});
    }

    logout(){
        localStorage.removeItem('user');
        this.setUserLogged();
    }

    sendResetEmail(email: string | null | undefined): Observable<any> {
        return this.http.get(environment.apiHost + "user/" + email + "/resetPassword");
    }

    resetPassword(email: string | null | undefined, passwordReset: PasswordReset): Observable<any> {
        return this.http.put(environment.apiHost + "user/" + email + "/resetPassword", passwordReset);
    }

}
