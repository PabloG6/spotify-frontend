import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RedirectComponent } from './redirect/redirect.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowTracksComponent } from './show-tracks/show-tracks.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    
    WelcomePageComponent,
    RedirectComponent,
    DashboardComponent,
    ShowTracksComponent,
    ErrorComponent,
    ConfirmModalComponent,
    SuccessModalComponent,
    ErrorModalComponent,
    HomeComponent,

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    BrowserAnimationsModule,
  ],

  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
