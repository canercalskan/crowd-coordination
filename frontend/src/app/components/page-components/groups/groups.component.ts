import { Component, OnInit } from "@angular/core";
import { GroupModel } from "src/app/models/group.model";
import { TaskModel } from "src/app/models/task.model";
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
    membersClicked: boolean = false;
    closedTasksClicked : boolean = false;
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

    openMembers() : void {
        this.membersClicked = true;
    }

    closeMembers() : void {
        this.membersClicked = false;
    }

    openClosedTasks() : void {
        this.closedTasksClicked = true;
    }

    closeClosedTasks() : void {
        this.closedTasksClicked = false;
    }

    markDone(done : TaskModel) : void {
        if(this.userGroup.manager.uid === this.userDetails.uid) {
            this.userGroup.tasks = this.userGroup.tasks.filter(task => task !== done)
            if(!this.userGroup.closedTasks || this.userGroup.closedTasks.length === 0) {
                this.userGroup.closedTasks = [done]
            }

            else if(this.userGroup.closedTasks) {
                this.userGroup.closedTasks.push(done);
            }

            this.accountService.updateGroup(this.userGroup).then(() => {
                Swal.fire('Success!', 'Task ' + done.title + ' marked as Done' , 'success')
            }).catch(error => {
                Swal.fire('Error' , 'Something went wrong, please try again later.' , 'error')
            })
        }

        else {
            Swal.fire('Info' , 'Only group manager can do this action.' , 'info')
        }
    }

    markCancel(cancel: TaskModel) : void {
        if(!cancel.mandatory) {
            if(this.userGroup.manager.uid === this.userDetails.uid) {
                this.userGroup.tasks = this.userGroup.tasks.filter(task => task !== cancel);
                this.accountService.updateGroup(this.userGroup).then(() => {
                    Swal.fire('OK.' , 'Task cancelled, note that if you cancel too many tasks your managership will be taken by admins.' , 'warning');
                })
                .catch(error => {
                    Swal.fire('Error' , 'Something went wrong.' , 'error')
                })
            }
            
            else {
                Swal.fire('Info' , 'Only group manager can do this action' , 'info')
            }
        }
        else {
            Swal.fire('Error' , 'This is a Mandatory task, you cannot cancel it.' , 'error')
        }
    }
}