import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { EmployeeService } from './Hero.services';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { fakeBackendProvider } from './mock-back-end';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    EmployeeService,
    Http,
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
