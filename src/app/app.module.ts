import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {AutoCompleteModule} from 'primeng/autocomplete';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    FrenchDateFormatPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AutoCompleteModule,
    ToastModule
  ],
  providers: [
    DatePipe,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
