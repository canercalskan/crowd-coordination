import { Injectable, NgModule } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
@NgModule()
@Injectable({providedIn: 'root'})
export class AccountService {
    constructor(private fireAuth : AngularFireAuth , private db : AngularFireDatabase) { }

    handleRegisterRequest(data : UserModel) : Promise<firebase.default.auth.UserCredential>{

        return this.fireAuth.createUserWithEmailAndPassword(data.email, data.password);
    }

    saveRegisterData(data : UserModel) : Promise<firebase.default.database.ThenableReference> {
        return this.db.list<UserModel>('users').push(data).then();
    }
    
    async handleLoginRequest(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
        const response = await firstValueFrom(this.getUser());
        if(!(response!.emailVerified)) {
            response!.sendEmailVerification();
            Swal.fire('Check your email' , 'Account verification link has been sent to your email, dont forget to check your spam folder.' , 'info').then(() => {
                location.reload();
            })
        }
        return this.fireAuth.signInWithEmailAndPassword(email , password);
    }

    getUser() : Observable<firebase.default.User | null> {
       return this.fireAuth.user;
    }
}