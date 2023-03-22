import { Component, OnInit } from "@angular/core";
import { PostModel } from "src/app/models/post.model";
import { PostService } from "src/app/services/post.service";
import { Router } from "@angular/router";
@Component({
    selector : 'posts',
    templateUrl : './posts.component.html',
    styleUrls : ['./posts.component.css']
})

export class PostsComponent implements OnInit{
    allPosts! : PostModel[];
    likedPosts : string[] = [];
    constructor (private postService : PostService , private router : Router) {}
    ngOnInit(): void {
        this.postService.getPosts().subscribe(response => {
            this.allPosts = response.filter(post => post.status !== 'assigned');
        })

        if(localStorage.getItem('likedPosts')) {
            this.likedPosts = JSON.parse(localStorage.getItem('likedPosts')!);
        }
        else {
            this.likedPosts = []
        }
    }

    handleLike(post : PostModel) : void {
        console.log('Liked posts :' + this.likedPosts);
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

    openCommentForm(key : string) : void {
        const formField = document.getElementById(key);
        if(formField!.style.display === 'none') {
            formField!.style.display = 'block';
        }
        else {
            formField!.style.display = 'none';
        }
    }
}