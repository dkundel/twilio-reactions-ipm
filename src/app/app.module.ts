import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders }  from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MobileComponent } from './mobile/mobile.component';
import { EmojiComponent } from './emoji/emoji.component';
import { MessagingService } from './messaging.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MobileComponent,
    EmojiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    MessagingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
