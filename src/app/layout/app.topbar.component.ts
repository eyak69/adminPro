import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { WebSessionService } from '../components/auth/service/websession.service';
import { User } from '../components/auth/interfaces/user';

import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles:[`
    .user-picture {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
   `]
  
})
export class AppTopBarComponent {

    items!: MenuItem[];
  
    private _user!: User | null;



    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, 
                private session:WebSessionService ) { }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this._user = this.session.getGSession()
        if (this._user!=null){
          this._user.picture = "assets/demo/images/cristian.jpg";
        }

        this.items = [
          {
              label: 'Perfil',
              icon: 'pi pi-user',
              items: [
                  {
                      label: 'Usuario',
                      icon: 'pi pi-user-edit',
                  },
                  {
                      label: 'Log Out',
                      icon: 'pi pi-sign-out'
                  }

              ]
          },
          {
          label: 'Configuración',
          icon: 'pi pi-cog',
            items: [
                {
                    label: 'Parametros',
                },
            ]
        },
      ];
  }
  
    
    
    public get user(): User | null {
        return this._user;
    }

             
}
