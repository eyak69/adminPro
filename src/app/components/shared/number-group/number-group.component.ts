import { Component, Input, Output, EventEmitter, HostListener, Host, Optional } from '@angular/core';
import { FormGroup,  ControlContainer, AbstractControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-number-group',
  templateUrl: './number-group.component.html',
  styles: [
  ]
})

export class NumberGroupComponent {
  @Input() public controlName!: string;
  @Input() labelText!: string;
  @Input() inputId!: string;
  @Input() mode!: string;
  @Input() currency!: string;
  @Input() locale!: string;
  @Output() textChanged = new EventEmitter<any>();

  miFormulario!: FormGroup;
  control!: AbstractControl | null;

  constructor(public controlContainer: ControlContainer) { }

  //control!: FormControl;
  ngOnInit() {
    // Fetch Form control (validator) from FormGroup parent
    this.miFormulario = <FormGroup>this.controlContainer.control;
    this.control = this.miFormulario.get(this.controlName);
  }

  onTextChanged(event: any) {
    const text = event.target.value;
    console.log('onTextChanged:' + text);
    this.textChanged.emit(event);
  } 
}
