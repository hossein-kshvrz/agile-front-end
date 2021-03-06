import { Component, OnInit } from '@angular/core';
import {UserManagementService} from '../api-management/services/user-management/user-management.service';
import {Order} from '../../models/order';
import {Buyer} from '../../models/buyer';

@Component({
  selector: 'app-buyer-profile',
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.scss']
})
export class BuyerProfileComponent implements OnInit {
  orderList: Order[];
  user: Buyer;
  phoneNumber: any;

  constructor(
    private userManagementService: UserManagementService,
  ) { }

  ngOnInit() {
    this.userManagementService.getBuyerProfile().subscribe((users: Buyer[]) => {
      this.user = users[0];
    });
    this.userManagementService.getBuyerOrders().subscribe((orders: Order[]) => {
      this.orderList = orders;
    });
  }

  updateBuyerProfile() {
    this.userManagementService.updateBuyerProfile(this.user).subscribe(result => {
      this.user = result;
    });
  }

  increaseCredit(amount: number) {
    this.userManagementService.increaseUserCredit(amount).subscribe(() =>
      window.location.reload()
    );
  }
}
