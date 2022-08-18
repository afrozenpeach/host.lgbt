import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { WINDOW_PROVIDERS } from '../services/windowProvider/window-provider';
import { WindowProviderService } from '../services/windowProvider/window-provider.service';
import { MomentModule } from 'ngx-moment';
import { PostComponent } from './post/post.component';
import { IndexContentComponent } from './index-content/index-content.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: '', component: IndexContentComponent },
      { path: 'post/:id/:slug', component: PostComponent }
    ]
  },
];

@NgModule({
  declarations: [
    IndexComponent,
    PostComponent,
    IndexContentComponent
  ],
  providers: [
    WINDOW_PROVIDERS,
    WindowProviderService
  ],
  imports: [
    CommonModule,
    MomentModule,
    RouterModule.forChild(routes)
  ]
})
export class HomepageModule { }
