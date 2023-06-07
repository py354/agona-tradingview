import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TradeComponent } from './pages/trade/trade.component';
import { IndicatorsComponent } from './pages/indicators/indicators.component';
import { AlgorithmsComponent } from './pages/algorithms/algorithms.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChartComponent } from './components/chart/chart.component';
import { MakeOrderComponent } from './components/make-order/make-order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { TimeLabelComponent } from './components/chart/components/time-label/time-label.component';
import { PriceLabelComponent } from './components/chart/components/price-label/price-label.component';
import { OrderBookComponent } from './components/chart/components/order-book/order-book.component';
import { TradesComponent } from './components/chart/components/trades/trades.component';
import { RatingComponent } from './pages/rating/rating.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TradeComponent,
    IndicatorsComponent,
    AlgorithmsComponent,
    ProfileComponent,
    ChartComponent,
    MakeOrderComponent,
    OrdersComponent,
    TimeLabelComponent,
    PriceLabelComponent,
    OrderBookComponent,
    TradesComponent,
    RatingComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
