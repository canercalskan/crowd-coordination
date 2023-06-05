import { Component, OnInit } from "@angular/core";
import { GroupModel } from "src/app/models/group.model";
import { UserModel } from "src/app/models/user.model";
import { AccountService } from "src/app/services/account.service";
import Swal from "sweetalert2";
import { getCookie } from "typescript-cookie";
@Component({
    templateUrl : './groups.component.html',
    styleUrls : ['./groups.component.css'],
    selector : 'groups'
})

export class GroupsComponent implements OnInit {
    userDetails! : UserModel;
    userGroup! : GroupModel;
    isManager! : boolean;
    constructor(private accountService : AccountService) {}
     ngOnInit(): void {
        if(getCookie('firebase_user_key')) {
           this.accountService.getUserDetails(getCookie('firebase_user_key')!).subscribe(response => {
                this.userDetails = response!;
                if(this.userDetails.groupId) {
                   this.accountService.getUserGroup(this.userDetails.groupId).subscribe(group => {
                        this.userGroup = group!;
                        if(this.userGroup.manager.uid === this.userDetails.uid) {
                            this.isManager = true;
                        }
                   })
                }
            })
        }
        else {
            this.accountService.handleSignOut().then(() => {
                Swal.fire('Error' , 'Your session has expired, please login again' , 'error').then(() => {
                    location.reload()
                })
            })
        }

    }
}