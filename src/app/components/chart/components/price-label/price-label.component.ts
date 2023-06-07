import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WebsocketService} from "../../../../services/websocket.service";
import {TradesComponent} from "../trades/trades.component";
import {MinmaxService} from "../../../../services/minmax.service";

@Component({
  selector: 'app-price-label',
  templateUrl: './price-label.component.html',
  styleUrls: ['./price-label.component.sass']
})
export class PriceLabelComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>
  ctx!: CanvasRenderingContext2D;
  requestId!: number;
  interval!: number;
  minPrice: number = 100;
  maxPrice: number = 200;
  formatter = new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2
  });
  constructor(private ngZone: NgZone, minmaxService: MinmaxService) {
    minmaxService.minMaxPrice$.subscribe((msg) => {
      this.minPrice = msg.min;
      this.maxPrice = msg.max;
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
  }

  tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    let lineHeight = this.ctx.canvas.height / 15
    let cur = this.maxPrice;
    let offset = 0;
    this.ctx.font = "12px serif";
    for (let i = 0; i < 15; i++) {
      this.ctx.fillText(this.formatter.format(cur), 4, offset + lineHeight/2 + 5);

      cur -= (this.maxPrice - this.minPrice) / 15
      offset += lineHeight;
    }

    this.requestId = requestAnimationFrame(() => this.tick);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
}
