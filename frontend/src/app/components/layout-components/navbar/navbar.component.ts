import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/services/account.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
@Component({
    selector : 'navbar',
    templateUrl : './navbar.component.html',
    styleUrls : ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
    displayName! : string
    constructor (private accountService : AccountService , private router : Router) {}
    ngOnInit(): void {
        this.accountService.getUser().subscribe(response => {
            this.displayName = response!.displayName!;
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
}