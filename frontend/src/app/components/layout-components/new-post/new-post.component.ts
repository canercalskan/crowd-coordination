import { Component } from "@angular/core";
import { PostModel } from "src/app/models/post.model";
import { PostService } from "src/app/services/post.service";
import { AccountService } from "src/app/services/account.service";
@Component({
    selector : 'new-post',
    templateUrl : './new-post.component.html',
    styleUrls : ['./new-post.component.css']
})

export class NewPostComponent {
    constructor (private accountService : AccountService , private postService : PostService) {}
    handleUrgentClicked() : void {
        const urgentIcon = document.getElementById('urgent-icon')!;
        if(urgentIcon.style.color === 'rgb(237, 90, 90)') {
            urgentIcon.style.color = '';
        }
        else {
            urgentIcon.style.color = 'rgb(237, 90, 90)'
        }
    }
    handleNewPostFormSubmission(value : PostModel) : void {
        this.accountService.getUser().subscribe(r => {
            // value.author = r!
        })
        this.postService.pushNewPost(value);
    }
}