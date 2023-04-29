import { Component, OnInit } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { PostModel } from "src/app/models/post.model";
import { UserModel } from "src/app/models/user.model";
import { AccountService } from "src/app/services/account.service";
import { PostService } from "src/app/services/post.service";
import Swal from "sweetalert2";
import { getCookie } from "typescript-cookie";
@Component({
    templateUrl : './profile.component.html',
    styleUrls : ['./profile.component.css'],
    selector : 'profile'
})

export class ProfileComponent implements OnInit{
    user! : UserModel;
    uid! : string;
    userPosts! : PostModel[];
    constructor(private accountService : AccountService , private postService : PostService) {}
    async ngOnInit() {
        Swal.showLoading()
        try {
            this.accountService.getUserDetails(getCookie('firebase_user_key')!).subscribe(r => {
                 this.user = r!;
                 console.log(this.user)
             })
     
             this.accountService.getUser().subscribe(r => {
                 this.uid = r!.uid;
                 this.postService.getPosts().subscribe(r => {
                     this.userPosts = r.filter(post => post.authorUid === this.uid);
                 })
                 Swal.close();
             });
        }
        catch (error) {
            Swal.fire('error' , 'error' , 'error')
        }
    }
}