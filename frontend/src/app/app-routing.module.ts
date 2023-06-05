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
import { AnonymRequestComponent } from './components/page-components/anonym-request/anonym-request.component';
import { ProfileComponent } from './components/page-components/profile/profile.component';
import { GroupsComponent } from './components/page-components/groups/groups.component';

const routes: Routes = [
  {path : '' , component : AnonymRequestComponent , canActivate : [LoginGuard]},
  {path : 'join' , component : HomeComponent , canActivate : [LoginGuard]},
  {path : 'timeline' , component : TimelineComponent , canActivate : [TimelineGuard]},
  {path : 'timeline/posts/:postKey' , component : PostDetailsComponent , canActivate : [TimelineGuard]},
  {path : 'profile' , component : ProfileComponent , canActivate : [TimelineGuard]},
  {path:  'groups' , component : GroupsComponent , canActivate : [TimelineGuard]},
  {path : 'admin' , component : AdminLoginComponent , canActivate : [AdminLoginGuard]},
  {path : 'admin/panel' , component : AdminPanelComponent , canActivate : [AdminAuthGuard]},
  {path : '**' , component : NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
