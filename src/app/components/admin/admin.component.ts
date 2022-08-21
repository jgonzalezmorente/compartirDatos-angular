import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from 'src/app/interfaces/message.interface';
import { DataChangeService } from '../../services/data-change.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  @ViewChild('txtMsg') txtMsg?: ElementRef;

  constructor( private dataChangeService: DataChangeService ) { }

  onEnter( message: string ) {
      
    const newMessage: Message = {
    id: '0',
    name: 'Admin',
    color: 'red',
    message
  };
  
  this.dataChangeService.notifyListeners( newMessage );
  this.txtMsg!.nativeElement.value = '';
}

}
