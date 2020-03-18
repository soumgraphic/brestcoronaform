import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FrenchDateFormatPipe } from './pipe/french-date-format.pipe';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    FrenchDateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
