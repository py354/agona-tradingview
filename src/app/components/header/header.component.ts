import { Component } from '@angular/core';
import {DialogService} from "../dialog/dialog.service";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  logined = false;
  constructor(private dialog: DialogService) {}

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent, { data: 'John' });

    dialogRef.afterClosed().subscribe((data) => {
      console.log('Dialog closed!', this.dialog);
    });
  }
}
