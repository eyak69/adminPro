import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, ControlContainer, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown-group',
  templateUrl: './dropdown-group.component.html',
  styles: [
  ]
})
export class DropdownGroupComponent {
  @Input() public labelText!: string;
  @Input() public lista!:any[];
  @Input() public controlName!: string;
  @Input() public optionLabel!: string
  @Input() public placeholder!: string
  @Output() public valueChange = new EventEmitter<any>();
 
  
  miFormulario!: FormGroup;
  control!:AbstractControl| null;

  constructor(public controlContainer: ControlContainer) {}

  //control!: FormControl;
  ngOnInit() {
    // Fetch Form control (validator) from FormGroup parent
      this.miFormulario = <FormGroup>this.controlContainer.control;
      this.control = this.miFormulario.get(this.controlName);
  }  

  onValueChange(event: any) {
    this.valueChange.emit(event.value);
  }


}
