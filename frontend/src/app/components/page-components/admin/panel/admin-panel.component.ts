import { Component, OnInit } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { AnonymRequestModel } from "src/app/models/anonym-request.model";
import { UserModel } from "src/app/models/user.model";
import { AdminService } from "src/app/services/admin.service";
import Swal from "sweetalert2";
@Component({
    selector : 'admin-panel',
    templateUrl : './admin-panel.component.html',
    styleUrls : ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit{
    usersClicked: boolean = false;
    groupsClicked : boolean = false;
    requestsClicked : boolean = true;
    postsClicked : boolean = false;
    tasksClicked : boolean = false;
    allClicked : boolean = true;
    activeClicked : boolean = false;
    doneClicked : boolean = false;
    allUsers! : UserModel[];
    allRequests! : AnonymRequestModel[];
    tempAllRequests! : AnonymRequestModel[];
    
    constructor (private adminService : AdminService) {}
   async ngOnInit() {
    Swal.showLoading();
        this.adminService.getAllRequests().subscribe(response => {
            this.allRequests = response;
            this.tempAllRequests = this.allRequests;
        } , error => {
            Swal.fire('Error' , 'Something went wrong, please contact the developers (code : ' + error.code+')');
        })
        Swal.close();
    }
    routeUsers() : void {
        this.adminService.getAllUsers().subscribe(response => {
            this.allUsers = response
        })
        this.postsClicked = false;
        this.tasksClicked = false;
        this.groupsClicked = false;
        this.requestsClicked = false;
        this.usersClicked = true;
    }
    routeRequests() : void {
        this.postsClicked = false;
        this.tasksClicked = false;
        this.groupsClicked = false;
        this.usersClicked = false;
        this.requestsClicked = true;
    }

    routeGroups() : void {
        this.postsClicked = false;
        this.tasksClicked = false;
        this.usersClicked = false;
        this.requestsClicked = false;
        this.groupsClicked = true;
    }

    routeTasks() : void {
        this.postsClicked = false;
        this.usersClicked = false;
        this.requestsClicked = false;
        this.groupsClicked = false;
        this.tasksClicked = true;
    }

    routePosts() : void {
        this.usersClicked = false;
        this.requestsClicked = false;
        this.groupsClicked = false;
        this.tasksClicked = false;
        this.postsClicked = true;
    }

    handleSignOut() : void {
        this.adminService.signOutAdmin();
    }

    requestDone(id : string) : void {
        this.adminService.requestDone(id).then(() => {
            Swal.fire('Success', 'Request marked as Done' , 'success')
        }).catch(error => {
            Swal.fire('Error' , 'Something went wrong, please contact the developers');
        })
    }

    requestActive(id : string) : void {
        this.adminService.requestActive(id).then(() => {
            Swal.fire('Success' , 'Request marked as Active' , 'success')
        }).catch(error => {
            Swal.fire('Error' , 'Something went wrong, please contact the developers')
        })
    }

    filterRequests(event : any) : void {
        if(event.target.value === 'all') {
            this.allRequests = this.tempAllRequests;
            this.allClicked = true
        }
        else if(event.target.value === 'active') {
            this.activeClicked = true
            this.allRequests = this.tempAllRequests.filter(request => request.status === 'Active')
        }

        else if(event.target.value === 'done') {
            this.doneClicked = true
            this.allRequests = this.tempAllRequests.filter(request => request.status === 'Done');
        }
    }

}