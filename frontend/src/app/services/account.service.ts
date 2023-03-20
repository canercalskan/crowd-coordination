import { Injectable, NgModule } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@NgModule()
@Injectable({providedIn: 'root'})
export class AccountService {
    constructor(private fireAuth : AngularFireAuth , private db : AngularFireDatabase) { }

    handleRegisterRequest(data : UserModel) : Promise<firebase.default.auth.UserCredential>{
        return this.fireAuth.createUserWithEmailAndPassword(data.email, data.password)
    }

    saveRegisterData(data : UserModel) : Promise<firebase.default.database.ThenableReference> {
        return this.db.list<UserModel>('users').push(data).then();
    }
    
    async handleLoginRequest(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
        return this.fireAuth.signInWithEmailAndPassword(email , password);
    }

    getUser() : Observable<firebase.default.User | null> {
       return this.fireAuth.user;
    }

    handleSignOut() : Promise<void> {
       return this.fireAuth.signOut();
    }
}