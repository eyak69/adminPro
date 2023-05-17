import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup } from '@angular/forms';

@Component({
  selector: 'app-toolbar-group',
  templateUrl: './toolbar-group.component.html',
  styles: [
  ]
})
export class ToolbarGroupComponent {
  @Input() formGroup!: FormGroup;
  @Input() public titulo!: string;
  @Output() nuevoEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() actualizarEvent: EventEmitter<void> = new EventEmitter<void>();

  nuevo(){
    this.nuevoEvent.emit();
  }

  actualizar(){
    this.actualizarEvent.emit();  
  }


}
