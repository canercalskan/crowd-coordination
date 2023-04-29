import { Component } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import { AccountService } from "src/app/services/account.service";
import provinces from "src/assets/json/province-data.json"
import Swal from "sweetalert2";
import { Router } from "@angular/router";
@Component({
    selector : 'home',
    templateUrl : './home.component.html',
    styleUrls : ['./home.component.css']
})

export class HomeComponent {
    alldata = provinces.data;
    allProvinces : string[] = [];
    allCounties : string[] = [];
    passwordError! : boolean;

    constructor (private accountService : AccountService , private router : Router) {
        this.alldata.forEach(data => {this.allProvinces.push(data.il_adi)});
    }

    handleLoginForm(value : {email : string, password : string}) : void {
        this.accountService.handleLoginRequest(value.email , value.password).then((r) => {
            this.accountService.saveUserKey(r.user!.uid);
            this.passwordError = false;
            this.router.navigate(['/timeline']);
        }).catch(error => {
            this.passwordError = true;
        })
    }

    handleProvinceSelection(value: string) {
        this.allCounties = [];
      this.alldata.find(data => data.il_adi === value)!.ilceler.forEach(ilce => {
        this.allCounties.push(ilce.ilce_adi);
      })
    }

    handleRegisterForm(value : UserModel) : void {
        value.verified = false;
        console.log(value)
        this.accountService.handleRegisterRequest(value).then(response => {
            response.user!.sendEmailVerification().then(() => {
                response.user!.updateProfile({displayName : value.name + ' ' + value.surname});
                value.uid = response.user!.uid!
                value.password = '*hidden*';
                this.accountService.saveRegisterData(value).then((r) => {
                    value.key = r.key!;
                    this.accountService.updateRegisterData(value).finally(() => {
                        Swal.fire('Success!' , 'You have registered successfully, before login, check your email for verification link.', 'success').then(() => {location.reload})
                    })
                }).catch(error => {Swal.fire('Error' , 'Something went wrong, please contact us' , 'error')})
            }).catch(error => {
                Swal.fire('Error' , 'Something went wrong, please contact us.' , 'error');
            })
            })
    }

    openRegisterForm() : void {
        const registerField = document.getElementById('registerField');
        registerField!.style.display = 'flex';
    }

    closeRegisterForm() : void {
        const registerField = document.getElementById('registerField');
        registerField!.style.display = 'none';
    }
}