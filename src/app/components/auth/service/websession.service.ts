import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WebSessionService {
  private user!: User | null;

  constructor(private authService:AuthenticationService) { }

   // Guardar información de conexión y usuario en sessionStorage
    saveGSession(token: string) {
      sessionStorage.setItem('Gtoken', token);
    }
    saveLSession(token: string) {
      sessionStorage.setItem('Ltoken', token);
    }
  
    // Obtener información de conexión y usuario desde sessionStorage
    getGSession(): User|null{
      const jwtHelper = new JwtHelperService();
      const token = sessionStorage.getItem('Gtoken');
      if (token!=null) {
        this.user =  jwtHelper.decodeToken(token)
        this.authService.isLoggedIn = true
      }
      return this.user;
    }
    getLSession() {
      const token = sessionStorage.getItem('token');
      return { token };
    }

    
}
