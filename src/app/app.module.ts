import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WINDOW_PROVIDERS } from './services/windowProvider/window-provider';
import { WindowProviderService } from './services/windowProvider/window-provider.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    WINDOW_PROVIDERS,
    WindowProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
