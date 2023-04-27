import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import { AdminService } from "src/app/services/admin.service";
@Component({
    selector : 'admin-panel',
    templateUrl : './admin-panel.component.html',
    styleUrls : ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit{
    allUsers! : UserModel[]
    constructor (private adminService : AdminService) {}
    ngOnInit(): void {
        this.adminService.getAllUsers().subscribe(response => {
            this.allUsers = response
        })
    }
    handleSignOut() : void {
        this.adminService.signOutAdmin();
    }

}