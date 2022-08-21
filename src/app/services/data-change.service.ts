import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class DataChangeService {

  private _messageSource = new Subject<Message>();
  public dataChanged: Observable<Message> = this._messageSource.asObservable();

  public notifyListeners( newMessage: Message ) {
    this._messageSource.next( newMessage );
  }

}
