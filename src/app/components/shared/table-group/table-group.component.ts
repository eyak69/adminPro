import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //debugger
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    //debugger
    //console.log(changes);
    //console.log(this.lista);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //debugger
  }

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