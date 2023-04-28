import { Injectable, NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UserModel } from '../models/user.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AnonymRequestModel } from '../models/anonym-request.model';

@Injectable({providedIn: 'root'})
@NgModule()
export class AdminService {
    constructor(private fireAuth : AngularFireAuth , private fireDB : AngularFireDatabase) { }
    authAdmin(data : {email : string , password : string}) : void {
        this.fireAuth.signInWithEmailAndPassword(data.email , data.password).then((r) => {
            if(r.user!.uid !== 'X3RuvaVTRjNPbBCeq8lFVYHyS2y2') {
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

    requestDone(id : string) {
        return this.fireDB.object<AnonymRequestModel>('anonym-requests/' + id).update({status : 'Done'});
    }
    
    requestActive(id : string) {
        return this.fireDB.object<AnonymRequestModel>('anonym-requests/' + id).update({status : 'Active'});
    }
}