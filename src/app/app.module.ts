import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {AuthModule} from "./modules/auth/auth.module";
import {LayoutModule} from "./modules/layout/layout.module";
import {TokenInterceptor} from "./modules/auth/tokenInterceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HomeModule} from "./modules/home/home.module";
import {GoogleLoginProvider, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import {oAuthClientId} from "../environments/credentials";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AuthModule,
    LayoutModule,
    HomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
          autoLogin: false,
          providers: [
              {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(oAuthClientId)
              }
          ],
          onError: (err) => {
              console.error(err);
          }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
