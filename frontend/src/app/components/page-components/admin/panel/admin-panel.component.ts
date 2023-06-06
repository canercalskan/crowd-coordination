import { Component, OnInit } from "@angular/core";
import { AnonymRequestModel } from "src/app/models/anonym-request.model";
import { GroupModel } from "src/app/models/group.model";
import { TaskModel } from "src/app/models/task.model"
import { PostModel } from "src/app/models/post.model";
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
    allPosts : PostModel[] = [];
    showGroupCreate : boolean = true;
    showGroupList : boolean = false;
    freeUsers! : UserModel[];
    freeManagers! : UserModel[];
    selectedUsers : UserModel[] = [];
    selectedManager! : UserModel | null;
    allGroups! : GroupModel[];
    taskOpened: boolean = false;
    openedGroup! : GroupModel | null;
    constructor (private adminService : AdminService) {}
   async ngOnInit() {
    Swal.showLoading();
        this.adminService.getAllRequests().subscribe(response => {
            this.allRequests = response;
            this.tempAllRequests = this.allRequests;
        } , error => {
            Swal.fire('Error' , 'Something went wrong, please contact the developers (code : ' + error.code+')');
        })
        this.adminService.getAllGroups().subscribe(response => {
            this.allGroups = response;
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
        this.adminService.getAllUsers().subscribe(response => {
            this.freeUsers = response.filter(user => (user.groupId === null || user.groupId === undefined) && user.role !== 'Manager');
            this.freeManagers = response.filter(user => (user.groupId === null || user.groupId === undefined) && user.role === 'Manager')
        })
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
        this.adminService.getAllPosts().subscribe(response => {
            this.allPosts = response;
        })
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

    handleConfirmPost(postId : string) : void {
        this.adminService.confirmPost(postId).then(() => {
            Swal.fire('Approved' , 'Post approved, it can be seen by all of the users now.' , 'success');
        })
    }

    handleDenyPost(postId : string) : void {
        this.adminService.denyPost(postId).then(() => {
            Swal.fire('Denied' , 'Post denied and deleted.' , 'info');
        })
    }

    handleRemovePost(postId : string) : void {
        this.adminService.denyPost(postId).then(() => {
            Swal.fire('Deleted' , 'Post successfully deleted from database.' , 'success');
        })
    }

    handleGroupsChange(event : any) : void {
        if(event.target.value === 'list') {
            this.showGroupCreate = false;
            this.showGroupList = true;
        }
        else if(event.target.value === 'create') {
            this.showGroupList = false;
            this.showGroupCreate = true;
        }
    }

    addMember(user : UserModel) : void {
        this.selectedUsers.push(user);
        console.log(this.selectedUsers)
    }
    
    removeMember(remove : UserModel) : void {
        this.selectedUsers = this.selectedUsers.filter(user => user !== remove);
        console.log(this.selectedUsers)
    }

    addManager(manager : UserModel) : void {
        this.selectedManager = manager
    }
    
    removeManager(manager : UserModel) : void {
        this.selectedManager = null;
    }

    handleGroupCreate(groupData : GroupModel) : void {
        Swal.showLoading();
        groupData.members = this.selectedUsers;
        groupData.manager = this.selectedManager!;
        if(this.selectedUsers.length > 0 && this.selectedManager !== null) {
            this.adminService.createGroup(groupData).then(response => {
                groupData.groupId = response.key!;
                groupData.members.forEach(member => {
                    member.groupId = groupData.groupId;
                })
                groupData.manager.groupId = groupData.groupId;
            }).then(() => {
                this.adminService.updateGroup(groupData);
                this.adminService.updateUsers(groupData);
            }).finally(() => {
                Swal.fire('Success!' , groupData.groupName + ' successfully created' , 'success');
            }).catch(error => {
                Swal.fire('Error', 'Something went wrong, please contact developers' ,'error');
            })
        }

        else {
            Swal.fire('Error' , 'Please select at least 1 member and only 1 manager', 'error')
        }
    }
    
    deleteGroup(group: GroupModel) : void {
        this.adminService.deleteGroup(group.groupId).then(() => {
            group.members.forEach(member => {
                member.groupId = null;
            })
            group.manager.groupId = null;
        }).then(() => {
            this.adminService.updateUsers(group);
        }).finally(() => {
            Swal.fire('Info', 'Group deleted.' , 'info');
        })
    }

    openTaskGroup(group : GroupModel) : void {
        this.taskOpened = true;
        this.openedGroup = group
    }

    closeTaskGroup() : void {
        this.openedGroup = null;
    }

    taskGroup(task: TaskModel) : void {
        task.status = false;
        if(!this.openedGroup!.tasks) {
            this.openedGroup!.tasks = [task];
            this.adminService.updateGroup(this.openedGroup!);
            Swal.fire('Success!' , 'The task has been assigned.' , 'success').then(() => {
                this.closeTaskGroup()
            })
        }
        else {
            this.openedGroup!.tasks.push(task);
            this.adminService.updateGroup(this.openedGroup!);
            Swal.fire('Success' , 'The task has been assigned' , 'success').then(() => {
                this.closeTaskGroup()
            })
        }
    }
}