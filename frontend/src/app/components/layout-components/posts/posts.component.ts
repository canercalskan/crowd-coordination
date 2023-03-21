import { Component, OnInit } from "@angular/core";
import { PostModel } from "src/app/models/post.model";
import { PostService } from "src/app/services/post.service";
@Component({
    selector : 'posts',
    templateUrl : './posts.component.html',
    styleUrls : ['./posts.component.css']
})

export class PostsComponent implements OnInit{
    allPosts! : PostModel[]
    constructor (private postService : PostService) {}
    ngOnInit(): void {
        this.postService.getPosts().subscribe(response => {
            this.allPosts = response.filter(post => post.status !== 'assigned');
        })
    }
}