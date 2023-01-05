import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MAT_DATE_LOCALE } from '@angular/material/core';
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
  ],
  exports:[
  ],
  providers: [
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    { provide: MAT_DATE_LOCALE, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getBaseUrl() {
  //     if(!environment.production){
  //    //  return  'https://g9c0phwqoi.execute-api.us-east-1.amazonaws.com/Prod/api/';
  //     return 'http://localhost:60915/api/';
  //     }
  return "http://localhost:5000/api/";//document.getElementsByTagName('base')[0].href;
}