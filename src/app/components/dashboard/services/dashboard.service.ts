import { Injectable } from '@angular/core';
import { Application, Dashboard } from '../../shared/interfaces/app.interface';
import { ApplicationService } from '../../services/application.service';
import { Moneda } from '../../moneda/interfaces/moneda.interface';
import { DolarSi } from '../interfaces/dolarsi.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private applicationService:ApplicationService ,
    private http: HttpClient) { 
    }


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

  getDolarSi(): Observable<DolarSi[]> {
    const url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
    return this.http.get<DolarSi[]>(url).pipe(
      map((data) => {
        const agenciasFiltradas = ['349', '310', '312', '313', '406'];
        return data.filter(cotizacion => agenciasFiltradas.includes(cotizacion.casa.agencia));
      }),
      catchError((error) => {
        console.error('Error al obtener las cotizaciones:', error);
        return [];
      })
    );
  }

}
