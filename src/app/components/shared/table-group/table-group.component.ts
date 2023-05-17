import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Columnas } from './table-columns';

@Component({
  selector: 'app-table-group',
  templateUrl: './table-group.component.html',
  styles: [],
})
export class TableGroupComponent {
  @Input() public lista!: any[];
  @Input() public columnas!: Columnas[];
  @Input() public id!: string;
  @Output() editEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter<any>();

  getPropertyValue(obj: any, propertyPath: string): any {
    const value = eval(`obj.${propertyPath}`);
    return value;
  }

  onEditProduct(id: any) {
    console.log(id);
    this.editEvent.emit(id);
  }

  onDeleteProduct(id: any) {
    console.log(id);
    this.deleteEvent.emit(id);
  }
}