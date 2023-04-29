import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import {LayoutModule} from "../layout/layout.module";
import { RequestsComponent } from './requests/requests.component';



@NgModule({
  declarations: [
    HomeScreenComponent,
    RequestsComponent
  ],
    imports: [
        CommonModule,
        LayoutModule
    ]

})
export class HomeModule { }
