import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.sass']
})
export class OrderBookComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>
  ctx!: CanvasRenderingContext2D;
  sellOrders: number[] = [1, .98, .80, .30, .25, .1, .06]
  buyOrders: number[] = [.87, .40, .39, .20, .15, .07, .03, 0].reverse()
  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    let ctx = this.canvas.nativeElement.getContext('2d')
    if (!ctx) {
      return
    }

    this.ctx = ctx;
    this.ngZone.runOutsideAngular(() => this.tick());
    // @ts-ignore
    this.tick();
  }

  tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    let lineHeight = this.ctx.canvas.height / (this.buyOrders.length + this.sellOrders.length)

    this.ctx.fillStyle = 'rgba(255, 0, 0, .5)';
    let offset = 0;
    for (let i = 0; i < this.sellOrders.length; i++) {
      let width = this.sellOrders[i] * this.ctx.canvas.width;
      this.ctx.fillRect(this.ctx.canvas.width - width, offset, width, lineHeight);
      offset += lineHeight;
    }

    this.ctx.fillStyle = 'rgba(0, 255, 0, .5)';
    for (let i = 0; i < this.buyOrders.length; i++) {
      let width = this.buyOrders[i] * this.ctx.canvas.width;
      this.ctx.fillRect(this.ctx.canvas.width - width, offset, width, lineHeight);
      offset += lineHeight;
    }
  }
}
