import { Injectable, NgModule } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post.model';

@Injectable({providedIn: 'root'})
@NgModule()

export class PostService {
    constructor(private db : AngularFireDatabase) { }
    getPosts() : Observable<PostModel[]> {
        return this.db.list<PostModel>('posts').valueChanges();
    }

    pushNewPost(data : PostModel) : void {

    }
}