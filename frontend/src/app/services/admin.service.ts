import { Injectable, NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UserModel } from '../models/user.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AnonymRequestModel } from '../models/anonym-request.model';
import { PostModel } from '../models/post.model';
import { GroupModel } from '../models/group.model';

@Injectable({providedIn: 'root'})
@NgModule()
export class AdminService {
    constructor(private fireAuth : AngularFireAuth , private fireDB : AngularFireDatabase) { }
    authAdmin(data : {email : string , password : string}) : void {
        this.fireAuth.signInWithEmailAndPassword(data.email , data.password).then((r) => {
            if(r.user!.uid !== 'O5TldtNTFeh0xawoHyYrq9qQ6Mi2') {
                Swal.fire('Error' , 'Access Denied' , 'error').then(() => {
                    this.fireAuth.signOut();
                }).finally(() => {
                    location.reload();
                })
            }
            else {
                location.reload();
            }
        }).catch(error => {
            Swal.fire('Error' , 'Invalid credentials' , 'error')
        })
    }

    signOutAdmin() : void {
        this.fireAuth.signOut().then(() => {
            location.reload();
        })
    }

    getAllUsers() : Observable<UserModel[]> {
        return this.fireDB.list<UserModel>('users').valueChanges();
    }

    getAllRequests() {
        return this.fireDB.list<AnonymRequestModel>('anonym-requests').valueChanges();
    }

    getAllGroups() {
        return this.fireDB.list<GroupModel>('groups').valueChanges();
    }

    getAllPosts() {
        return this.fireDB.list<PostModel>('posts').valueChanges();
    }

    requestDone(id : string) {
        return this.fireDB.object<AnonymRequestModel>('anonym-requests/' + id).update({status : 'Done'});
    }
    
    requestActive(id : string) {
        return this.fireDB.object<AnonymRequestModel>('anonym-requests/' + id).update({status : 'Active'});
    }

    confirmPost(id : string) {
        return this.fireDB.object<PostModel>('posts/' + id).update({status : 'confirmed'});
    }

    denyPost(id : string) {
        return this.fireDB.object<PostModel>('posts/' + id).remove();
    }
    
    createGroup(groupData : GroupModel) {
        return this.fireDB.list<GroupModel>('groups').push(groupData);
    }

    updateGroup(groupData : GroupModel) {
        return this.fireDB.object<GroupModel>('groups/' + groupData.groupId).update(groupData);
    }

    deleteGroup(id: string) {
        return this.fireDB.list<GroupModel>('groups').remove(id);
    }

    updateUsers(groupData : GroupModel) {
        groupData.members.forEach(member => {
            this.fireDB.object<UserModel>('users/' + member.key).update(member);
        })
        this.fireDB.object<UserModel>('users/' + groupData.manager.key).update(groupData.manager);
    }
}
