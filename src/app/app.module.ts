import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SimpleHttpComponent } from './screens/simple-http/simple-http.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './services/shared.service';
import { ScheduleComponent } from './screens/schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleHttpComponent,
    LayoutComponent,
    ScheduleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
