import { Inject, Injectable } from '@angular/core';
import { WINDOW } from './window-provider';

@Injectable({
  providedIn: 'root'
})
export class WindowProviderService {

  constructor(
    @Inject(WINDOW) private window: Window
  ) { }

  getHostname() : string {
    return this.window.location.hostname;
  }

  forward(newDomain: string) {
    this.window.location.href = newDomain;
  }
}
