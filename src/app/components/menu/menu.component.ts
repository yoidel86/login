import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {Router} from '@angular/router';
import {MatMenuTrigger} from '@angular/material';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    loggedIn = false;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;


    constructor(public authServices: AuthService, private router: Router) {

    }

    ngOnInit() {
        this.authServices.currentUser.subscribe(user => {
            this.loggedIn = !!user;
        });
    }

    logout(): void {
        this.authServices.logout();
        this.router.navigate(['']);
    }

    menu() {
        this.trigger.openMenu();
    }

}
