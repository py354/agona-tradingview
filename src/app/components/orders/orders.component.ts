import { Component } from '@angular/core';

type Order = {
  date: string,
  pair: string,
  type: 'Long' | 'Short',
  status: string,
  price: number,
  count: number,
  tp: number,
  sl: number
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent {
  orders: Order[] = [
    {
      date: '06.06 10:15',
      pair: 'BTC/USDT',
      type: 'Long',
      status: 'pending',
      price: 25737.97,
      count: .1,
      tp: 25737.97 * 1.1,
      sl: 25737.97 * 0.9,
    },
    {
      date: '06.05 10:10',
      pair: 'BTC/USDT',
      type: 'Short',
      status: 'open',
      price: 25735.2,
      count: .018,
      tp: 25735.2 * 1.1,
      sl: 25735.2 * 0.9,
    }
  ]

  displayedColumns: string[] = ['date', 'pair', 'type', 'status', 'price', 'count', 'tp', 'sl', 'action']

  getColor(order: Order): string {
    if (order.type == 'Long') {
      return 'color: green'
    }
    return 'color: red'
  }
}
