import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/page-components/404/not-found.component';
import { AdminLoginComponent } from './components/page-components/admin/login/admin-login.component';
import { AdminPanelComponent } from './components/page-components/admin/panel/admin-panel.component';
import { HomeComponent } from './components/page-components/home/home.component';
import { PostDetailsComponent } from './components/page-components/post-details/post-details.component';
import { TimelineComponent } from './components/page-components/timeline/timeline.component';
import { AdminAuthGuard, AdminLoginGuard } from './guards/admin.guard';
import { TimelineGuard } from './guards/timeline.guard';
import { LoginGuard } from './guards/timeline.guard';

const routes: Routes = [
  {path : '' , component : HomeComponent , canActivate : [LoginGuard]},
  {path : 'home' , component : HomeComponent , canActivate : [LoginGuard]},
  {path : 'timeline' , component : TimelineComponent , canActivate : [TimelineGuard]},
  {path : 'timeline/posts/:postKey' , component : PostDetailsComponent , canActivate : [TimelineGuard]},
  {path : 'admin' , component : AdminLoginComponent , canActivate : [AdminLoginGuard]},
  {path : 'admin/panel' , component : AdminPanelComponent , canActivate : [AdminAuthGuard]},
  {path : '**' , component : NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
