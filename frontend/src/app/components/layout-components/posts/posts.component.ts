import { Component, OnInit } from "@angular/core";
import { PostModel } from "src/app/models/post.model";
import { PostService } from "src/app/services/post.service";
import { Router } from "@angular/router";
import { CommentModel } from "src/app/models/comment.model";
import Swal from "sweetalert2";
import { AccountService } from "src/app/services/account.service";
@Component({
    selector : 'posts',
    templateUrl : './posts.component.html',
    styleUrls : ['./posts.component.css']
})

export class PostsComponent implements OnInit{
    allPosts! : PostModel[];
    likedPosts : string[] = [];
    constructor (private postService : PostService , private router : Router , private AccountService : AccountService) {}
    ngOnInit(): void {
        this.postService.getPosts().subscribe(response => {
            this.allPosts = response.filter(post => post.status === 'confirmed');
        })

        if(localStorage.getItem('likedPosts')) {
            this.likedPosts = JSON.parse(localStorage.getItem('likedPosts')!);
        }
        else {
            this.likedPosts = []
        }
    }

    handleLike(post : PostModel) : void {
        if(!this.likedPosts.includes(post.key)) {
            this.postService.likePost(post);
            this.likedPosts.push(post.key);
            localStorage.setItem('likedPosts' , JSON.stringify(this.likedPosts));
        }
        else {
            this.postService.unlikePost(post);
            this.likedPosts = this.likedPosts.filter(key => key !== post.key);
            localStorage.setItem('likedPosts' , JSON.stringify(this.likedPosts));
        }
    }

    navigatePostDetails(postKey : string) : void {
        this.router.navigate(['timeline/posts/' + postKey]);
    }

    openCommentForm(post : PostModel) : void {
        post.commentsClicked = true;
    }

    handleCommentSubmission(post : PostModel , comment : CommentModel) : void {
        const date = new Date();
        this.AccountService.getUser().subscribe(r => {
            if(r!.displayName !== '' || r!.displayName !== null || r!.displayName !== undefined) {
                comment.author = r!.displayName!;
                comment.like = 0;
                comment.date = date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear();
                if(post.comments === undefined || post.comments === null) {
                    post.comments = [comment]
                }
                else {
                    post.comments.push(comment);
                }
    
                this.postService.updatePost(post).then((r) => {console.log(r)}).catch(error => {
                    Swal.fire('Error' , 'Something went wrong, please contact us' , 'error')
                })
            }
        })
    }

    handleCommentLike() : void {}
}