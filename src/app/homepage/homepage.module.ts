import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { WINDOW_PROVIDERS } from '../services/windowProvider/window-provider';
import { WindowProviderService } from '../services/windowProvider/window-provider.service';

const routes: Routes = [
  { path: '', component: IndexComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    IndexComponent
  ],
  providers: [
    WINDOW_PROVIDERS,
    WindowProviderService
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomepageModule { }
