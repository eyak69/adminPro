import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonGroupComponent } from 'src/app/components/shared/button-group/button-group.component';
import { TextGroupComponent } from './text-group/text-group.component';
import { MultiselectGroupComponent } from './multiselect-group/multiselect-group.component';
import { PasswordGroupComponent } from './password-group/password-group.component';
import { DropdownGroupComponent } from './dropdown-group/dropdown-group.component';




@NgModule({
  declarations: [
    ButtonGroupComponent,
    TextGroupComponent,
    MultiselectGroupComponent,
    PasswordGroupComponent,
    DropdownGroupComponent
  ],
  exports:[
    ButtonGroupComponent,
    TextGroupComponent,
    MultiselectGroupComponent,
    PasswordGroupComponent,
    DropdownGroupComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
