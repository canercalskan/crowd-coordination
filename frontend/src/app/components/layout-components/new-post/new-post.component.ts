import { Component } from "@angular/core";
import { PostModel } from "src/app/models/post.model";
import { PostService } from "src/app/services/post.service";
import { AccountService } from "src/app/services/account.service";
import Swal from "sweetalert2";

@Component({
    selector : 'new-post',
    templateUrl : './new-post.component.html',
    styleUrls : ['./new-post.component.css']
})

export class NewPostComponent {
    selectedFile! : FileList;
    currentUser! : firebase.default.User;
    constructor (private accountService : AccountService , private postService : PostService) {
        this.accountService.getUser().subscribe(r => {
            this.currentUser = r!;
        })
    }
    handleUrgentClicked() : void {
        const urgentIcon = document.getElementById('urgent-icon')!;
        if(urgentIcon.style.color === 'rgb(237, 90, 90)') {
            urgentIcon.style.color = '';
        }
        else {
            urgentIcon.style.color = 'rgb(237, 90, 90)'
        }
    }

    handleImageSelection(event : any) : void {
        this.selectedFile = event.target.files
        console.log(this.selectedFile);
    }

    handleNewPostFormSubmission(value : PostModel) : void {
        Swal.fire({
            title : 'Uploading..',
            text : 'Please wait a while',
            allowEscapeKey : false,
            allowOutsideClick : false,
            didOpen : () => {
                Swal.showLoading()
            }
          })
          if(this.selectedFile) {
            let newPost = new PostModel(this.selectedFile);
            newPost.authorUid = this.currentUser.uid!;
            newPost.authorName = this.currentUser.displayName!;
            newPost.authorImage = this.currentUser.photoURL!;
            newPost.status = 'active';
            newPost.content = value.content;
            newPost.urgency = value.urgency;
            this.postService.pushFileToStorage(newPost);
          }
          else {
              Swal.fire('Hata' , 'Bilinmeyen bir hata oluştu.' , 'error');
          }
    }
}