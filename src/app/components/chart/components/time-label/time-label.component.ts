import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TimelinesService} from "../../../../services/timelines.service";

@Component({
  selector: 'app-time-label',
  templateUrl: './time-label.component.html',
  styleUrls: ['./time-label.component.sass']
})
export class TimeLabelComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>
  ctx!: CanvasRenderingContext2D;
  requestId!: number;
  interval!: number;
  formatter = new Intl.DateTimeFormat("ru", {
    hour: "numeric",
    minute: "numeric",
  });
  constructor(private ngZone: NgZone, private timelinesService: TimelinesService) {}

  ngOnInit() {
    let ctx = this.canvas.nativeElement.getContext('2d')
    if (!ctx) {
      return
    }

    this.ctx = ctx;
    this.ctx.fillStyle = 'black';
    this.ngZone.runOutsideAngular(() => this.tick());
    // @ts-ignore
    this.interval = setInterval(() => {
      this.tick();
    }, 35);
  }

  tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // план действий: берем минимальное и максимальное значнеие таймстемпа, рассчитываем 10 лейблов (минутных): их название и место
    let distance = 1000 * 60 * 10;
    let now = new Date().getTime()
    let minDate = now - distance;

    this.ctx.font = "14px serif";
    let currentTimestamp = now;
    let results = [];
    for (let i = 0; i < 12; i++) {
      let near = currentTimestamp - currentTimestamp % (1000 * 60);
      let label = this.formatter.format(new Date(near))
      let x = (near - minDate) / distance * this.ctx.canvas.width
      this.ctx.fillText(label, x-20, 20)
      results.push(x);
      currentTimestamp -= 1000 * 60
    }
    this.timelinesService.minMaxPrice$.next(results);

    this.requestId = requestAnimationFrame(() => this.tick);
  }

  on() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
}
