import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { DashboardsRoutingModule } from './dashboard-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
/*        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,*/
        //PanelMenuModule,
        //ButtonModule,
        DashboardsRoutingModule,
        PrimeNgModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }
