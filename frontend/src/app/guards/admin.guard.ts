import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot , Router} from '@angular/router';
import { Observable , map} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';

@NgModule()
@Injectable({providedIn: 'root'})
export class AdminAuthGuard implements CanActivate {
    constructor(private fireAuth : AngularFireAuth , private router : Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
        return this.checkAuth();
    }

    checkAuth() : Observable<boolean> {
        return this.fireAuth.user.pipe(map((response) => {
            if(response && response.uid === 'X3RuvaVTRjNPbBCeq8lFVYHyS2y2') {
              return true;
            }
            else {
              this.router.navigate(['admin']);
              return false;
            }
          }
          ))}
}


@NgModule()
export class AdminLoginGuard implements CanActivate {
  constructor(private fireAuth : AngularFireAuth , private router : Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
    return this.checkAuth();
  }

  checkAuth() : Observable<boolean> {
    return this.fireAuth.user.pipe(map((response) => {
        if(response && response.uid === 'X3RuvaVTRjNPbBCeq8lFVYHyS2y2') {
          this.router.navigate(['admin/panel']);
          return false;
        }
        else {
          return true;
        }
      }
      ))}
}