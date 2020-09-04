import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthGuard } from './_guards';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    FormsModule, ReactiveFormsModule, // Forms
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule],
  providers: [
    AuthGuard,
    StatusBar,
    SplashScreen,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
