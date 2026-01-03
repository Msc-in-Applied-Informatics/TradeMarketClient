import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/models';
import { ProductService } from 'src/app/services/product/product.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.less']
})
export class InventoryComponent {

myProducts: Product[] = [];
  isLoading = false;
  
  shopAfm!: string; 

  constructor(
    private productService: ProductService,
    private notify: NotificationService,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInventory();    
  }


  loadInventory() {
    this.isLoading = true;
    this.shopAfm = this.auth.getUser()?.afm;
    this.productService.getProductsByShop(this.shopAfm).subscribe({
      next: (response: any) => {
        this.myProducts = response?.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.notify.showError('Αποτυχία φόρτωσης αποθέματος');
        this.isLoading = false;
      }
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product,this.shopAfm).subscribe({
      next: () => {
        this.notify.showSuccess('Το προϊόν αφαιρέθηκε');
        this.loadInventory(); 
      },
      error: () => this.notify.showError('Η διαγραφή απέτυχε')
    });
  }

  restoreProduct(product: Product) {
    this.productService.revertProduct(product, this.shopAfm).subscribe({
        next: () => {
          this.notify.showSuccess('Το προϊόν επανήλθε');
          this.loadInventory(); 
        },
        error: () => this.notify.showError('Η επαναφορά απέτυχε')
    })
  }

  addProduct() {
  this.openDialog();
}

editProduct(product: any) {
  this.openDialog(product);
}

openDialog(productData?: any) {
  const dialogRef = this.dialog.open(ProductDialogComponent, {
    width: '95vw',         
    maxWidth: '1000px',    
    height: 'auto',        
    maxHeight: '90vh',    
    panelClass: 'custom-dialog-container',  
    data: productData
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const finalProduct = { ...result, shopAfm: this.shopAfm };
      this.saveProduct(finalProduct);
    }
  });
}

  saveProduct(product: any) {
    let action = "add"
    if (product.id) {
      action = "update"
    }
  this.productService.saveProduct(product,action).subscribe({
    next: (res: any) => {
      if (res.code === 200) {
        this.notify.showSuccess('Η αποθήκευση ολοκληρώθηκε!');
        this.loadInventory(); 
      }
    },
    error: () => this.notify.showError('Σφάλμα κατά την αποθήκευση')
  });
}


}
