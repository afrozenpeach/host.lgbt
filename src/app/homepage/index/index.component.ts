import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WindowProviderService } from 'src/app/services/windowProvider/window-provider.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  hostname = '';

  constructor(
    private windowService: WindowProviderService,
    private route: ActivatedRoute
  ) {
    this.hostname = windowService.getHostname();
  }

  ngOnInit(): void {
    if (this.hostname == 'localhost') {
      this.route.params.subscribe(params => {
        this.hostname = params['domain'];

        if (this.hostname == undefined) {
          this.hostname = 'host.lgbt';
        }
      });
    }
  }

}
