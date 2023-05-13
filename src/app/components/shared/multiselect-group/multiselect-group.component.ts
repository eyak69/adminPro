import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, ControlContainer, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-multiselect-group',
  templateUrl: './multiselect-group.component.html',
  styles: [
  ]
})
export class MultiselectGroupComponent {
  @Input() public labelText!: string;
  @Input() public lista!:any[];
  @Input() public controlName!: string;
  @Input() public optionLabel!: string
  @Input() public defaultLabel!: string


  miFormulario!: FormGroup;
  control!:AbstractControl| null;

  constructor(public controlContainer: ControlContainer) {}

  //control!: FormControl;
  ngOnInit() {
    // Fetch Form control (validator) from FormGroup parent
      this.miFormulario = <FormGroup>this.controlContainer.control;
      this.control = this.miFormulario.get(this.controlName);
  }  

}
