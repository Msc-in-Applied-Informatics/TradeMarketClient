import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.less']
})
export class ProductDialogComponent {
  productForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    this.isEditMode = !!data;
    
    this.productForm = this.fb.group({
      id: [data?.id || null],
      brand: [data?.brand || '', Validators.required],
      type: [data?.type || '', Validators.required],
      description: [data?.description || ''],
      price: [data?.price || 0, [Validators.required, Validators.min(0.01)]],
      stock: [data?.stock || 0, [Validators.required, Validators.min(0)]],
      active: [data?.active ?? true]
    });
  }

  onSave() {
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}