import { Component } from "@angular/core";
import Swal from "sweetalert2";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AnonymRequestModel } from "src/app/models/anonym-request.model";

@Component({
    selector : 'anonym-request',
    templateUrl : './anonym-request.component.html',
    styleUrls : ['./anonym-request.component.css']
})

export class AnonymRequestComponent {
    currentCoordinates! : string
    constructor (private db : AngularFireDatabase) {
        navigator.geolocation.getCurrentPosition(r => {
            this.currentCoordinates = r.coords.latitude + ' ' + r.coords.longitude;
            console.log(this.currentCoordinates)
        })
    }

    handleRequestForm(data : AnonymRequestModel) : void {
        Swal.showLoading()
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