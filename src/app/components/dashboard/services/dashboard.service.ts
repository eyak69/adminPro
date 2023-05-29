import { Injectable } from '@angular/core';
import { Application, Dashboard } from '../../shared/interfaces/app.interface';
import { ApplicationService } from '../../services/application.service';
import { Moneda } from '../../moneda/interfaces/moneda.interface';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private applicationService:ApplicationService ) { }

  getDashboard(): Dashboard {
    const dashboard: Dashboard = this.applicationService.getApplication().dashboard;  
    if(dashboard  == null){
      return {
        moneda0: {} as Moneda,
        moneda1: {} as Moneda,
        moneda2: {} as Moneda
      } as Dashboard;
    } else return dashboard;
  }
  
  setDashboard(dashboard: Dashboard): void {
    const application: Application = this.applicationService.getApplication();
    application.dashboard = dashboard;
    this.applicationService.setApplication(application);
  }

}
