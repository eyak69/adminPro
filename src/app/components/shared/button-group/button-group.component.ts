import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styles: [
  ]
})

export class ButtonGroupComponent {
  @Input() formGroup!: FormGroup;
  @Output() cancelarEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() aceptarEvent: EventEmitter<void> = new EventEmitter<void>();

  cancelar(): void {
    this.cancelarEvent.emit();
  }
  
  aceptar(): void {
    this.aceptarEvent.emit()
  }
}
