import {Injectable, OnDestroy} from '@angular/core';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {webSocket} from "rxjs/webSocket";

export interface MessageData {
  "e": string,  // Event type
  "E": number,   // Event time
  "s": string,    // Symbol
  "a": number,     // Aggregate trade ID
  "p": string,     // Price
  "q": string,       // Quantity
  "f": number,         // First trade ID
  "l": number,         // Last trade ID
  "T": number,   // Trade time
  "m": boolean,        // Is the buyer the market maker?
}


@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy{
  socket$!: WebSocketSubject<MessageData>;
  constructor() {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket("wss://fstream.binance.com/ws/btcusdt@aggTrade")
    }
  }

  ngOnDestroy() {
    this.socket$.complete();
  }
}
