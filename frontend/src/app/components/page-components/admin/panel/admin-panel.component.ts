import { Component } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";
@Component({
    selector : 'admin-panel',
    templateUrl : './admin-panel.component.html',
    styleUrls : ['./admin-panel.component.css']
})

export class AdminPanelComponent {
    constructor (private adminService : AdminService) {}
    handleSignOut() : void {
        this.adminService.signOutAdmin();
    }
}