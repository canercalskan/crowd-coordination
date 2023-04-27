import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable , map} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserModel } from '../models/user.model';

@NgModule()
@Injectable({providedIn: 'root'})
export class TimelineGuard implements CanActivate {

    constructor(private fireAuth : AngularFireAuth , private router : Router , private fireDB : AngularFireDatabase) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
        return this.checkAuth();
    }

    checkAuth() : Observable<boolean> {
        return this.fireAuth.user.pipe(map((response) => {
            if(response && response.emailVerified) {
              this.fireDB.object<UserModel>('users/' + response.uid).update({verified : true});
              return true;
            }

            else if(!response) {
              this.router.navigate(['home'])
              return false
            }

            else {
              Swal.fire('Not Verified!' , 'Check your email for verification link' , 'error').then(() => {this.router.navigate(['home'])})
              return false;
            }})
      
          )}
    };


    @Injectable({providedIn : 'root'})
    export class LoginGuard implements CanActivate {
        constructor(private fireAuth : AngularFireAuth , private router : Router) {}
        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
            return this.checkAuth();
        }

        checkAuth() : Observable<boolean> {
            return this.fireAuth.user.pipe(map((response) => {
                if(response && response.emailVerified) {
                  this.router.navigate(['timeline'])
                  return false;
                }
          
                else {
                  return true;
                }})
          
              ) 
        }
    }