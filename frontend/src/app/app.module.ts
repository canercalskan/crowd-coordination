import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/page-components/home/home.component';
import { AccountService } from './services/account.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/layout-components/footer/footer.component';
import { TimelineComponent } from './components/page-components/timeline/timeline.component';
import { TimelineGuard } from './guards/timeline.guard';
import { NavbarComponent } from './components/layout-components/navbar/navbar.component';
import { NotFoundComponent } from './components/page-components/404/not-found.component';
import { PostsComponent } from './components/layout-components/posts/posts.component';
import { PostService } from './services/post.service';
import { NewPostComponent } from './components/layout-components/new-post/new-post.component';
import { PostDetailsComponent } from './components/page-components/post-details/post-details.component';
import { NewCommentComponent } from './components/layout-components/new-comment/new-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent, NavbarComponent,
    TimelineComponent,
    NotFoundComponent,
    PostsComponent , NewPostComponent, PostDetailsComponent,
    NewCommentComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule , FormsModule,
    AccountService,
    NgbModule,
    TimelineGuard,
    PostService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
