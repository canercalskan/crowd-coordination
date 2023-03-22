import { Component } from "@angular/core";
import { CommentModel } from "src/app/models/comment.model";
import { AccountService } from "src/app/services/account.service";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { PostModel } from "src/app/models/post.model";
@Component({
    selector :'new-comment',
    templateUrl : './new-comment.component.html',
    styleUrls : ['./new-comment.component.css']
})

export class NewCommentComponent {
    constructor(private AccountService : AccountService , private db : AngularFireDatabase){}

    // handleNewComment(data : CommentModel , postKey : string) : void {
    //     data.like = 0;
    //     data.dislike = 0;
    //     this.AccountService.getUser().subscribe(r => {
    //         data.author = r!.displayName!;
    //         this.db.object<PostModel>('posts/' + postKey).valueChanges().subscribe(response => {
    //             response!.comments.push(data);
    //             this.db.object<PostModel>('posts/' + postKey).update(response!)
    //         })
    //     })
    // }
    handleNewComment(data : CommentModel) : void {}
}