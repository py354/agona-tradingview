import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TimelinesService {
  minMaxPrice$ = new Subject<number[]>();
}
