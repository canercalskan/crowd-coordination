import { Injectable, NgModule } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { finalize, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { PostModel } from '../models/post.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({providedIn: 'root'})
@NgModule()

export class PostService {
    private basePath = 'posts';
    constructor(private db : AngularFireDatabase , private storage : AngularFireStorage) { }

    getPosts() : Observable<PostModel[]> {
        return this.db.list<PostModel>('posts').valueChanges();
    }

    pushFileToStorage(data : PostModel) : void {
      console.log(data)
        Swal.fire({
          title : 'Post Uploading',
          text : 'Please wait a while..',
          allowEscapeKey : false,
          allowOutsideClick : false,
          didOpen : () => {
              Swal.showLoading()
          }
      })
        let filePath = `${this.basePath}/${data.images!.item(0)!.name!}`;
        let storageRef = this.storage.ref(filePath);
        let uploadTask = this.storage.upload(filePath , data.images.item(0)!);

        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe(downloadURL => {
              data.imageURL = downloadURL;
              this.pushNewPost(data);
            })
          })
        ).subscribe();
      }

      pushNewPost(data : PostModel) : void {
        this.db.list(this.basePath).push(data).then(() => {
            Swal.close();
            Swal.fire('Success' , 'Your post has published', 'success').then(() => {
                return;
            })
        }).catch(error => {
            Swal.close();
            Swal.fire('Error' , 'Something went wrong, contact us.' , 'error')
        })
      }

}