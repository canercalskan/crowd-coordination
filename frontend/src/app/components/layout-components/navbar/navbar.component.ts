import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/services/account.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { UserModel } from "src/app/models/user.model";
import { getCookie } from "typescript-cookie";

@Component({
    selector : 'navbar',
    templateUrl : './navbar.component.html',
    styleUrls : ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
    displayName! : string;
    userDetails! : UserModel;
    constructor (private accountService : AccountService , private router : Router) {}
    ngOnInit(): void {
        this.accountService.getUser().subscribe(response => {
            this.displayName = response!.displayName!;
        })
        this.accountService.getUserDetails(getCookie('firebase_user_key')!).subscribe(r => {
            this.userDetails = r!;
        })
    }

    signOut() : void {
        this.accountService.handleSignOut().then(r => {
            Swal.fire('Signed out' , 'You have been successfully signed out' , 'success').then(() => {
                this.router.navigateByUrl('join');
            })
        }).catch(error => {
            Swal.fire('Something went wrong' , 'Please contact us with the code < '+ error.code + '>' , 'error');
        })
    }

    removeTask() : void {
        if(this.userDetails.notifications.length > 0) {
             this.userDetails.notifications.pop();
             this.accountService.updateRegisterData(this.userDetails).then(r => {
                Swal.fire('OK' , 'Task Removed' , 'success');
             }).catch(error => {
                Swal.fire('Error' ,'Something went wrong, please try again later.', 'error')
             })
        }
        else {
            Swal.fire('Error' , 'Something went wrong, please try again later.' ,'error').then(()=>{
                location.reload();
            })
        }
    }
}