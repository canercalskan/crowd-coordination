import { Component } from "@angular/core";
import { UserModel } from "src/app/models/user.model";
import { AccountService } from "src/app/services/account.service";
import provinces from "src/assets/json/province-data.json"
import Swal from "sweetalert2";
@Component({
    selector : 'home',
    templateUrl : './home.component.html',
    styleUrls : ['./home.component.css']
})

export class HomeComponent {
    alldata = provinces.data;
    allProvinces : string[] = [];
    allCounties : string[] = [];
    constructor (private accountService : AccountService) {
        this.alldata.forEach(data => {this.allProvinces.push(data.il_adi)});
    }

    handleLoginForm(value : {email : string, password : string}) : void {
        this.accountService.handleLoginRequest(value.email , value.password).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    }

    handleProvinceSelection(value: string) {
        this.allCounties = [];
      this.alldata.find(data => data.il_adi === value)!.ilceler.forEach(ilce => {
        this.allCounties.push(ilce.ilce_adi);
      })
    }

    handleRegisterForm(value : UserModel) : void {
        this.accountService.handleRegisterRequest(value).then(response => {
            value.uid = response.user!.uid!;
            value.password = '*hidden*';
            this.accountService.saveRegisterData(value).finally(() => {
                Swal.fire('Success!' , 'You have registered successfully', 'success').then(() => {location.reload})
            }).catch(error => {Swal.fire('Error' , 'Something went wrong, please contact us.' , 'error')})
        }).catch(error => {
            Swal.fire('Error' , 'Something went wrong, please contact us.' , 'error');
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