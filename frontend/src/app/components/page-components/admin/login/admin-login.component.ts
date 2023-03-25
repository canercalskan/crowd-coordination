import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdminService } from "src/app/services/admin.service";
@Component({
    selector : 'admin-login',
    styleUrls : ['./admin-login.component.css'],
    templateUrl : './admin-login.component.html'    
})

export class AdminLoginComponent {
    constructor (private adminService : AdminService) {}
    handleAdminLogin(data : {email : string , password : string}) : void {
        this.adminService.authAdmin(data)
    }
}