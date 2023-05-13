import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { User } from '../interfaces/user';
import { WebSessionService } from '../service/websession.service';


declare var window: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];
    password!: string;
    credencial!:string;
    user: User  | null = null;

    constructor(private router: Router, 
                public layoutService: LayoutService, 
                public session:WebSessionService) { }


    ngOnInit() {
        this.googleInitialized();
    }

    private googleInitialized(): void{
            //El windows esta fuera de la accion de angular
            window.google.accounts.id.initialize({
                client_id: "172467646216-a0jj2acuqshnnmfth5kmt91kts6av1bc.apps.googleusercontent.com",
                callback: this.handleCredentialResponse.bind(this) // por eso se debe llamar a la funcion de angular de esta forma
                });
                window.google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }  // customization attributes
                );
                window.google.accounts.id.prompt(); // also display the One Tap dialog
    }

    handleCredentialResponse(response:any){
        if (response!=null){
            this.credencial = response.credential
            //aqui gravo la session de gooogle
            this.session.saveGSession(this.credencial)
            //y la recupero aqui para probar
            this.user = this.session.getGSession()
            console.log(this.user?.email)
            console.log(this.user?.name)
            //
            // window.location.assign('/')
            this.router.navigateByUrl('/')
        }

    }

}
