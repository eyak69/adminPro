import { NgModule } from '@angular/core';

//PrimeNg Modulos
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown'
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch'; 
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';



@NgModule({
  declarations: [],

  exports: [
    ButtonModule,
    CardModule,
    MenubarModule,
    FieldsetModule,
    ToolbarModule ,
    SplitButtonModule,
    TableModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    InputSwitchModule,
    CheckboxModule,
    MultiSelectModule, 
    PasswordModule,
    DialogModule,
    DynamicDialogModule    
  ]
})
export class PrimeNgModule { }
