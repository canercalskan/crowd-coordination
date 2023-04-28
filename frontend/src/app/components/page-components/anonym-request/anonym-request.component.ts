import { Component } from "@angular/core";
import Swal from "sweetalert2";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AnonymRequestModel } from "src/app/models/anonym-request.model";
import { environment } from "src/environments/environment";
import { AnonymService } from "src/app/services/anonym.service";

@Component({
    selector : 'anonym-request',
    templateUrl : './anonym-request.component.html',
    styleUrls : ['./anonym-request.component.css']
})

export class AnonymRequestComponent {
    currentCoordinates! : string;
    latitude! : number;
    longitude! : number;
    getAddressURL! : string;
    constructor (private db : AngularFireDatabase , private anonymService : AnonymService) {
        navigator.geolocation.getCurrentPosition(r => {
            this.currentCoordinates = r.coords.latitude + ' ' + r.coords.longitude;
            this.latitude = r.coords.latitude;
            this.longitude = r.coords.longitude;
            this.getAddressURL = `https://api.opencagedata.com/geocode/v1/json?q=${this.latitude}+${this.longitude}&key=${environment.api_key}`
        })
    }

   async handleRequestForm(data : AnonymRequestModel) {
        Swal.showLoading();
        const response = await this.anonymService.getFullAddress(this.getAddressURL);
        response.subscribe((responseData : any) => {
           data.full_address = responseData.results[0].components.state + ', ' + responseData.results[0].components.town + ', '+ responseData.results[0].components.village + ', ' + responseData.results[0].components.road
        })

        data.coordinates = this.currentCoordinates;

        this.db.list<AnonymRequestModel>('anonym-requests').push(data).then(response => {
            data.id = response.key!;
        }).finally(() => {
            this.db.object<AnonymRequestModel>('anonym-requests/' + data.id).update(data).then(() => {
                Swal.fire('Success!' , 'Your request has been sent, we will contact you as ASAP' , 'success')
            })
        })
    }
}