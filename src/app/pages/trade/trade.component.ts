import {Component, OnDestroy} from '@angular/core';
import {MessageData, WebsocketService} from "../../services/websocket.service";
import {BehaviorSubject, Observable, of, from} from "rxjs";

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.sass']
})
export class TradeComponent {}
