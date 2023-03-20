import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/page-components/404/not-found.component';
import { HomeComponent } from './components/page-components/home/home.component';
import { TimelineComponent } from './components/page-components/timeline/timeline.component';
import { TimelineGuard } from './guards/timeline.guard';
import { LoginGuard } from './guards/timeline.guard';

const routes: Routes = [
  {path : '' , component : HomeComponent , canActivate : [LoginGuard]},
  {path : 'home' , component : HomeComponent , canActivate : [LoginGuard]},
  {path : 'timeline' , component : TimelineComponent , canActivate : [TimelineGuard]},
  {path : '**' , component : NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
