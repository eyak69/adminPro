import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonGroupComponent } from 'src/app/components/shared/button-group/button-group.component';
import { TextGroupComponent } from './text-group/text-group.component';
import { MultiselectGroupComponent } from './multiselect-group/multiselect-group.component';
import { PasswordGroupComponent } from './password-group/password-group.component';
import { DropdownGroupComponent } from './dropdown-group/dropdown-group.component';
import { ToolbarGroupComponent } from './toolbar-group/toolbar-group.component';
import { TableGroupComponent } from './table-group/table-group.component';
import { NumberGroupComponent } from './number-group/number-group.component';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { DynamicPipePipe } from './pipes/dynamic-pipe.pipe';
import { PercentPipe } from '@angular/common';
import { DecimalPipe }  from '@angular/common';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    ButtonGroupComponent,
    TextGroupComponent,
    MultiselectGroupComponent,
    PasswordGroupComponent,
    DropdownGroupComponent,
    ToolbarGroupComponent,
    TableGroupComponent,
    NumberGroupComponent,
    NumberFormatPipe,
    DynamicPipePipe
  ],
  exports:[
    ButtonGroupComponent,
    TextGroupComponent,
    MultiselectGroupComponent,
    PasswordGroupComponent,
    DropdownGroupComponent,
    ToolbarGroupComponent,
    TableGroupComponent,
    NumberGroupComponent,
    NumberFormatPipe,
    DynamicPipePipe
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
  ],
  providers: [
    // list all pipes you would like to use
    PercentPipe,
    NumberFormatPipe,
    DecimalPipe,
    DatePipe
    ],
})
export class SharedModule { }
