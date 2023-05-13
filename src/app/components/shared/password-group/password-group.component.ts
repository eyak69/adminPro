import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, ControlContainer, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-password-group',
  templateUrl: './password-group.component.html',
  styles: [
  ]
})
export class PasswordGroupComponent {
  @Input() public controlName!: string;
  @Input() labelText!: string;
  @Output() textChanged = new EventEmitter<any>();

  miFormulario!: FormGroup;
  control!:AbstractControl| null;

  constructor(public controlContainer: ControlContainer) {} 

  ngOnInit() {
    // Fetch Form control (validator) from FormGroup parent
    this.miFormulario = <FormGroup>this.controlContainer.control;
    this.control = this.miFormulario.get(this.controlName);
  }  

}
