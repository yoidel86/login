import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../_services/api.service';
import {Service} from '../../_models/service';
import {City} from '../../_models/city';
import {WizardComponent} from 'ng2-archwizard/dist';


@Component({
    selector: 'app-wizardservice',
    templateUrl: './wizardservice.component.html',
    styleUrls: ['./wizardservice.component.css']
})

export class WizardserviceComponent implements OnInit {
    @ViewChild(WizardComponent)
    public wizards: WizardComponent;

    step_title: string;
    previews: string[][];
    previewvalue = 'assets/imagenes.png';
    service: Service;
    positiontitle:string;
    cities: City[];
    categories: any;
    currentPos = 0;
    //current positions data
    latitude:string;
    longitude:string;

    week_days = [
        {title: 'Lunes', value: false},
        {title: 'Martes', value: false},
        {title: 'Miercoles', value: false},
        {title: 'Jueves', value: false},
        {title: 'Viernes', value: false},
        {title: 'Sabado', value: false},
        {title: 'Domingo', value: false},
    ];



    constructor(private apiServices: ApiService) {
        this.previews = [
            ['assets/imagenes.png', 'assets/imagenes.png', 'assets/imagenes.png'],
            ['assets/imagenes.png', 'assets/imagenes.png', 'assets/imagenes.png'],
            ['assets/imagenes.png', 'assets/imagenes.png', 'assets/imagenes.png'],
            ['assets/imagenes.png', 'assets/imagenes.png', 'assets/imagenes.png']
        ];
        this.step_title = 'Datos iniciales';
        this.service = new Service();
        this.service.galery = new Array();
        this.service.positions = new Array();
        this.service.week_days = [false, false, false, false, false, false, false];
    }

    ngOnInit() {
        this.apiServices.cities().subscribe(result => this.cities = result);
        this.apiServices.allSubCategories().subscribe(result => this.categories = result);
    }

    changeCity(city) {
        console.log('cualquier cosa');
        console.log(city);
    }

    changeCity2() {
        console.log('cualquier cosa');
    }

    create() {
        console.log('MADO A GUARDAR');
        this.apiServices.createService(this.service).subscribe(result => this.siguiente(result));
    }

    step3() {
        console.log('MADO A GUARDAR');
        this.apiServices.createService(this.service).subscribe(result => this.siguiente(result));
    }

    galery() {
        console.log('MADO A GUARDAR');
        this.apiServices.createGalery(this.service).subscribe(result => this.siguiente(result));
    }

    siguiente(result) {
        if (result.id) {
            this.service.id = result.id;
            this.wizards.navigation.goToNextStep();
        } else {
            //TODO SOLO PARA PRUEBAS QUITAR
            this.service.id = 2;
            this.wizards.navigation.goToNextStep();
        }
    }

    addPosition(){
        this.service.positions.push({
            title: this.positiontitle,
            longitude: this.longitude,
            latitude: this.latitude
        });
        this.positiontitle = "";
        this.longitude ="0";
        this.latitude = "0";
    }


    onFotoChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            console.log('cargando el fichero');
            reader.onload = () => {
                // this.service.icon = ({
                //     filename: file.name,
                //     filetype: file.type,
                //     value: reader.result.split(',')[1]
                // });
                let row = Math.trunc(this.currentPos / 3);
                let col = this.currentPos % 3;
                console.log(row, col, this.currentPos);
                this.previews[row][col] = reader.result;
                this.service.galery.push({
                    filename: file.name,
                    filetype: file.type,
                    value: reader.result.split(',')[1]
                });
                this.currentPos = this.currentPos + 1;
            };
        }
    }
    finishFunction(){

        this.apiServices.createFullService(this.service).subscribe(result => this.showService(result));
    }
    showService(servic){

    }
    onFileChange(event) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.service.icon = ({
                    filename: file.name,
                    filetype: file.type,
                    value: reader.result.split(',')[1]
                });
                this.previewvalue = reader.result;
            };
        }
    }

    // onFileChange(event) {
    //     let reader = new FileReader();
    //     if(event.target.files && event.target.files.length > 0) {
    //         let file = event.target.files[0];
    //         reader.readAsDataURL(file);
    //         reader.onload = () => {
    //             this.form.get('avatar').setValue({
    //                 filename: file.name,
    //                 filetype: file.type,
    //                 value: reader.result.split(',')[1]
    //             })
    //         };
    //     }
    // }


}
