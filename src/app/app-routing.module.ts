import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TradeComponent} from "./pages/trade/trade.component";
import {IndicatorsComponent} from "./pages/indicators/indicators.component";
import {AlgorithmsComponent} from "./pages/algorithms/algorithms.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {RatingComponent} from "./pages/rating/rating.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/trade',
        pathMatch: "full",
      },
      {
        path: 'trade',
        component: TradeComponent,
      },
      {
        path: 'indicators',
        component: IndicatorsComponent,
      },
      {
        path: 'algorithms',
        component: AlgorithmsComponent,
      },
      {
        path: 'rating',
        component: RatingComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
