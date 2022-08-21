import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/interfaces/message.interface';
import { DataChangeService } from 'src/app/services/data-change.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewChecked, OnDestroy {
  
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() color: string = '';
  
  @ViewChild('msg') msg?: ElementRef;
  @ViewChild('txtMsg') txtMsg?: ElementRef;

  public messages: Message[] = [];

  private _dataChangeSubscription?: Subscription;

  constructor( private dataChangeService: DataChangeService ) { }
  
  ngOnInit(): void {
    this._dataChangeSubscription = this.dataChangeService.dataChanged.subscribe(
      message => this.messages.push( message )
    );
  }
    
  ngAfterViewChecked(): void {
    this.msg!.nativeElement.scrollTop = this.msg!.nativeElement.scrollHeight;
  }
    
  onEnter( message: string ) {
    const newMessage: Message = {
      id: this.id,
      name: this.name,
      color: this.color,
      message
    };
    
    this.dataChangeService.notifyListeners( newMessage );
    this.txtMsg!.nativeElement.value = '';
  }
  
  ngOnDestroy(): void {
    this._dataChangeSubscription?.unsubscribe();
  }
  
  
}
