import { Component, OnInit } from '@angular/core';
import { SaleRecord } from 'src/app/models/models';
import { ShoppingService } from 'src/app/services/shopping/shopping.service';



@Component({
  selector: 'app-shop-sales',
  templateUrl: './shop-sales.component.html',
  styleUrls: ['./shop-sales.component.less']
})
export class ShopSalesComponent implements OnInit {
  dataSource: SaleRecord[] = [];
  displayedColumns: string[] = ['id', 'type', 'product', 'customer','revenue', 'stock'];
  totalRevenue = 0;
  isLoading = true;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.afm) {
      this.fetchSales(user.afm);
    }
  }

  fetchSales(afm: string) {
    this.shoppingService.getSales(afm).subscribe({
      next: (res) => {
        if (res.code === 200 && res.data) {
          this.dataSource = res.data.map((item: any) => ({
            id: item.id,
            productName: `${item.product.brand} ${item.product.description}`,
            productType: item.product.type,
            revenue: item.priceAtPurchase,
            stockLeft: item.product.stock,
            customerName: item.citizenName || 'Άγνωστος',
            customerAfm: item.citizenAfm || 'N/A'
          }));
          this.calculateTotal();
        }
        this.isLoading = false;
      }
    });
  }

  calculateTotal() {
    this.totalRevenue = this.dataSource.reduce((acc, curr) => acc + curr.revenue, 0);
  }
}