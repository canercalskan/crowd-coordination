import { Injectable, NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';

@Injectable({providedIn: 'root'})
@NgModule()
export class AdminService {
    constructor(private fireAuth : AngularFireAuth) { }
    authAdmin(data : {email : string , password : string}) : void {
        this.fireAuth.signInWithEmailAndPassword(data.email , data.password).then((r) => {
            if(r.user!.uid !== '2UsQMrfbU1W16XIFOohbrZHZz9t2') {
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
}