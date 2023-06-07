import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

type MinMaxMsg = {
  min: number,
  max: number,
}

@Injectable({
  providedIn: 'root'
})
export class MinmaxService {
  minMaxPrice$ = new Subject<MinMaxMsg>();

  send(min: number, max: number) {
    this.minMaxPrice$.next({ min, max });
  }
}
