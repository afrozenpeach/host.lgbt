import { Component } from '@angular/core';
import { WindowProviderService } from './services/windowProvider/window-provider.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hostname = 'host.lgbt';
  title = 'host.lgbt';

  constructor (
    private windowService: WindowProviderService
  ) {
    this.hostname = windowService.getHostname();

    if (this.hostname == 'localhost') {
      this.hostname = 'host.lgbt';
    }
  }
}
