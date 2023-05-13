import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl, ControlContainer, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-text-group',
  templateUrl: './text-group.component.html',
  styles: [
  ]
})
export class TextGroupComponent {
  @Input() public controlName!: string;
  @Input() inputType!: string;
  @Input() labelText!: string;
  @Output() textChanged = new EventEmitter<any>();

  miFormulario!: FormGroup;
  control!:AbstractControl| null;

  constructor(public controlContainer: ControlContainer) {}

  //control!: FormControl;
  ngOnInit() {
    // Fetch Form control (validator) from FormGroup parent
    this.miFormulario = <FormGroup>this.controlContainer.control;
    this.control = this.miFormulario.get(this.controlName);
  }  

  onTextChanged(event: any) { 
    const text = event.target.value;
    console.log('onTextChanged:' + text)
    this.textChanged.emit(event);
  }
}
