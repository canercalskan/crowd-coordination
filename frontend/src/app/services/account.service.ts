import { Injectable, NgModule } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { setCookie , removeCookie} from 'typescript-cookie';

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

    updateRegisterData(data : UserModel) {
        return this.db.object<UserModel>('users/' + data.key).update(data);
    }
    
    async handleLoginRequest(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
        return this.fireAuth.signInWithEmailAndPassword(email , password);
    }

    saveUserKey(uid : string) : void {
        this.db.list<UserModel>('users').valueChanges().subscribe(r => {
           setCookie('firebase_user_key' , r.find(user => user.uid === uid)!.key);
        })
    }

    getUser() : Observable<firebase.default.User | null> {
       return this.fireAuth.user;
    }

    getUserDetails(key : string) {
        return this.db.object<UserModel>('users/' + key).valueChanges();
    }

    handleSignOut() : Promise<void> {
       removeCookie('firebase_user_key');
       return this.fireAuth.signOut();
    }
}

