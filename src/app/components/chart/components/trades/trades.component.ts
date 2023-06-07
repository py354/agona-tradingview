import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WebsocketService} from "../../../../services/websocket.service";
import {MinmaxService} from "../../../../services/minmax.service";
import {Subscription} from "rxjs";
import {TimelinesService} from "../../../../services/timelines.service";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

type Trade = {
  price: number,
  timestamp: number,
  isBuyerMarketMaker: boolean,
}

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.sass']
})
export class TradesComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>
  ctx!: CanvasRenderingContext2D;
  requestId!: number;
  interval!: number;

  maxPrice: number = 0;
  minPrice: number = 0;

  horizontalLinesPath?: Path2D;

  trades: Trade[] = [];
  sub?: Subscription;
  timelines: number[] = [];

  constructor(private ngZone: NgZone, private websocket: WebsocketService, private minmaxService: MinmaxService, private timelinesService: TimelinesService) {
    this.sub = this.websocket.socket$.subscribe(msg => {
      this.trades.push({isBuyerMarketMaker: msg.m, price: parseInt(msg.p), timestamp: msg.T})
      this.maxPrice = this.trades.reduce((prev, cur) => {
        return (prev.price > cur.price) ? prev : cur
      }).price

      this.minPrice = this.trades.reduce((prev, cur) => {
        return (prev.price < cur.price) ? prev : cur
      }).price

      minmaxService.send(this.minLabelPrice(), this.maxLabelPrice())
    })

    this.timelinesService.minMaxPrice$.subscribe((xs: number[]) => {
     this.timelines = xs
    })
  }

  ngOnInit() {
    let ctx = this.canvas.nativeElement.getContext('2d')
    if (!ctx) {
      return
    }

    this.ctx = ctx;
    this.ngZone.runOutsideAngular(() => this.tick());
    // @ts-ignore
    this.interval = setInterval(() => {
      this.tick();
    }, 20);

    this.horizontalLinesPath = new Path2D();
    this.ctx.lineWidth = 0.3;
    let lineHeight = this.ctx.canvas.height / 15
    let offset = 0;
    for (let i = 0; i < 15; i++) {
      let y = offset + lineHeight/2;
      this.horizontalLinesPath.moveTo(0, y)
      this.horizontalLinesPath.lineTo(this.ctx.canvas.width, y)
      offset += lineHeight;
    }
  }

  tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.lineWidth = 0.3;
    if (this.horizontalLinesPath) {
      this.ctx.stroke(this.horizontalLinesPath)
    }

    this.ctx.lineWidth = 0.3;
    this.ctx.beginPath()
    for (let x of this.timelines) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.ctx.canvas.height)
    }
    this.ctx.stroke()

    let maxDate = new Date().getTime();
    let minDate = new Date().getTime() - 1000 * 60 * 10;
    this.trades = this.trades.filter((trade) => (trade.timestamp > minDate))
    this.ctx.lineWidth = 1;
    this.ctx.beginPath()
    let isBegin = false;

    let points = new Path2D();

    this.trades.forEach((trade: Trade) => {
      let x = (trade.timestamp - minDate) / (maxDate - minDate) * this.ctx.canvas.width;
      let y = (1 - (trade.price - this.minLabelPrice()) / (this.maxLabelPrice() - this.minLabelPrice())) * this.ctx.canvas.height;
      this.ctx.fillStyle = trade.isBuyerMarketMaker ? 'rgb(0, 255, 0)' : 'rgb(255, 0, 2)'
      this.ctx.fillRect(x - 2, y + this.ctx.canvas.height / 15 / 2 - 2, 5, 5)

      if (!isBegin) {
        isBegin = true
        this.ctx.moveTo(x, y + this.ctx.canvas.height / 15 / 2)
      } else {
        this.ctx.lineTo(x, y + this.ctx.canvas.height / 15 / 2)
      }
    });
    this.ctx.stroke();


    this.requestId = requestAnimationFrame(() => this.tick);
  }

  maxLabelPrice() {
    return this.maxPrice + Math.max((this.maxPrice - this.minPrice) * .1, 1)
  }

  minLabelPrice() {
    return this.minPrice - Math.max((this.maxPrice - this.minPrice) * .1, 1)
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
}
