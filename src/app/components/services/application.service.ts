import { Injectable } from '@angular/core';
import { Application } from '../shared/interfaces/app.interface';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private clave: string = 'application';

  constructor() { }
  
  setApplication(application: Application): void {
     sessionStorage.setItem(this.clave, JSON.stringify(application));
  }
  getApplication(): Application {
    const application: Application = JSON.parse(sessionStorage.getItem(this.clave) ?? '{}'); 
    return application;
  }

}
