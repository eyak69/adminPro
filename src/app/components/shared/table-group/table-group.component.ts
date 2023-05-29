import { Component, EventEmitter, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Columnas } from './table-columns';
import { NumberFormatPipe } from '../pipes/number-format.pipe';
import { DynamicPipePipe } from '../pipes/dynamic-pipe.pipe';
import { PercentPipe } from '@angular/common';
@Component({
  selector: 'app-table-group',
  templateUrl: './table-group.component.html',
  styles: [`
  
.text-align-left {
  text-align: right;
}
  
  .numeric-align-table .numeric-align {
  text-align: right;
}

.numeric-align-body .numeric-align {
  text-align: right;
}

  
  `]
})
export class TableGroupComponent {
  @ViewChild('numberFormatTemplate') numberFormatTemplate!: TemplateRef<any>;

  @Input() public lista!: any[];
  @Input() public columnas!: Columnas[];
  @Input() public id!: string;
  @Input() public pageSize!: number;
  @Input() public totalRecords!: number
  @Input() public loading!: boolean
  @Input() public isEditVisible: boolean = true;
  @Input() public isDeleteVisible: boolean = true;
  @Output() editEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() lazyLoadEvent: EventEmitter<any> = new EventEmitter<any>();
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //debugger


  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    //debugger
    //console.log(this.columnas);
    //console.log(this.lista);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //debugger
  }

  getPropertyValue(obj: any, propertyPath: string): any {
   // debugger
    const value = eval(`obj.${propertyPath}`);
    console.log(value)
    return value;
  }

  onEdit(id: any) {
    console.log(id);
    this.editEvent.emit(id);
  }

  onDelete(id: any) {
    console.log(id);
    this.deleteEvent.emit(id);
  }

  onPageChange(event: any) {
    this.pageEvent.emit(event);
    console.log(event);
  }

  onLazyLoad(event: any) {
    this.lazyLoadEvent.emit(event);
    console.log(event);
  }

  isNumber(value: any): boolean {
    const respuesta = typeof value === 'number' && !isNaN(value)
    return respuesta;
  }

}