// componetes angular
import { Component, ViewChild } from "@angular/core";
// providers
import  {SubCategoryProvider} from  '../../providers/sub-category/sub-category';
import  {AuthProvider} from  '../../providers/auth/auth';
import { ServiceProvider } from "../../providers/service/service.service";

// Paginas
import  {PopoverPage} from  '../pop-over/pop-over';
import {ServicesPage} from '../services/services';
import  {CategoriesPage} from  '../categories/categories';
import 'rxjs/add/operator/map';
// componetes ionic
import {IonicPage,PopoverController,NavController,} from 'ionic-angular';
import {
  NavParams,
  LoadingController,
  Keyboard,
  Platform
} from "ionic-angular";
// native components
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServicePage } from "../service/service";
import { HttpErrorResponse } from "@angular/common/http";
import { ApiProvider } from "../../providers/api/api";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  subCategories = [];
  services = [];
  para: any;
  connetionDown: boolean;
  loggedIn: boolean;
  noFound: boolean;
  baseUrl: any;
  busqueda:boolean;
  loading: any;
  @ViewChild('search') search;


  constructor(
     public auth: AuthProvider,
     private popoverCtrl: PopoverController,
     public subCat: SubCategoryProvider,
     public navCtrl: NavController ,
     public api: ApiProvider,
     public servProv: ServiceProvider,
     private load: LoadingController,
     public keyboard: Keyboard,
     navParams: NavParams,public splashScreen: SplashScreen,public platform: Platform) {
      this.connetionDown = false;
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.busqueda = false;
      this.noFound = false;
      this.baseUrl = this.api.getbaseUrl() + "resources/image/";
      this.auth.currentUser.subscribe(user=>{
        this.loggedIn = !!user;
      });
       this.subCat.topSubcategories().then(
        data => {
          this.subCategories =data['data'];
          this.splashScreen.hide();
          this.connetionDown = false;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.connetionDown = true;
            this.splashScreen.hide();
          } else {
            this.splashScreen.hide();
            this.connetionDown = true;
          }
        });
    });
      }

  searchServices(query){

    this.loading = this.load.create();
    this.loading.present();
    this.servProv.getServiceBySearch(query).then(
      data => {
        this.services =data['data'];
        this.noFound = this.services.length == 0 ? true : false;
        this.loading.dismiss();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.connetionDown = true;
          this.loading.dismiss();
        } else {
          this.loading.dismiss();
          this.connetionDown = true;
        }
      });
  }

  // ngOnInit() {
  //   this.auth.currentUser.subscribe(user=>{
  //     this.loggedIn = !!user;
  //   });
  //    this.subCat.topSubcategories().then(
  //     data => {
  //       this.subCategories =data['data'];
  //       this.splashScreen.hide();
  //       this.connetionDown = false;
  //     },
  //     (err: HttpErrorResponse) => {
  //       if (err.error instanceof Error) {
  //         this.connetionDown = true;
  //         this.splashScreen.hide();
  //       } else {
  //         this.splashScreen.hide();
  //         this.connetionDown = true;
  //       }
  //     });
  // }
  goSearch(keyCode) {
    if (keyCode === 13){
     this.busqueda = true;
     this.searchServices(this.search.value);
     this.keyboard.close();
    }
  }

  onCancel(e){
    this.services = [];
    this.busqueda = false;
    this.noFound =  false;
  }
  openServicePage(id){
    this.navCtrl.push(ServicePage,{
      serviceId:id
    })
  }

  onInput(e){

    if( this.search.value == "" )
      {
      this.busqueda = false;
      this.services = [];
      this.noFound =  false;
     }
  }
  delete(chip: Element) {
    chip.remove();
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: ev,

    });
  }
  openCategoriesPage(){
    this.navCtrl.push(CategoriesPage)
  }
  openServicesPage(id){
    this.navCtrl.push(ServicesPage,{
      subCatId:id
    });
  }
  reConnect(){
    this.subCat.topSubcategories()
    .then(
      (cat) => {
        this.busqueda = false;
        this.connetionDown = false;
        this.subCategories = cat['data'];
      }
    ).catch(
      (error) => {
        this.connetionDown = true;
      }
    );
  }
}

