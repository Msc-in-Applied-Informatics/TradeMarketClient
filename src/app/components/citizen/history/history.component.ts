import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShoppingService } from 'src/app/services/shopping/shopping.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistoryComponent  implements OnInit{
dataSource: any = [];
  columnsToDisplay = ['id', 'orderDate', 'totalAmount', 'expand'];
  expandedElement: any = null;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.afm) {
      this.shoppingService.getHistory(user.afm).subscribe(res => {
        if (res.code === 200) {
          this.dataSource = res.data;
        }
      });
    }
  }
}
