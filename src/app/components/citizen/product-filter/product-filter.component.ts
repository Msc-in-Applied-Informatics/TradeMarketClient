import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core'; // Πρόσθεσε OnChanges, SimpleChanges
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/models';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.less']
})
export class ProductFilterComponent implements OnInit, OnChanges { // Υλοποίηση OnChanges
  @Output() filterChanged = new EventEmitter<any>();
  @Input() allProducts: Product[] = [];   

  filterForm!: FormGroup;
  filteredTypes: string[] = [];
  filteredBrands: string[] = [];
  

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allProducts'] && this.allProducts.length > 0) {
      this.updateDropdowns();
    }
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      type: [''],
      brand: [''],
      minPrice: [null],
      maxPrice: [null]
    });

    this.filterForm.get('type')?.valueChanges.subscribe(() => this.updateDropdowns());
    this.filterForm.get('brand')?.valueChanges.subscribe(() => this.updateDropdowns());
  }

  updateDropdowns() {
    if (!this.allProducts || this.allProducts.length === 0) return;

    const selectedType = this.filterForm.get('type')?.value;
    const selectedBrand = this.filterForm.get('brand')?.value;


    let typeData = this.allProducts;
    if (selectedBrand) {
      typeData = typeData.filter(p => p.brand === selectedBrand);
    }
    this.filteredTypes = [...new Set(typeData.map(p => p.type))].sort();


    let brandData = this.allProducts;
    if (selectedType) {
      brandData = brandData.filter(p => p.type === selectedType);
    }
    this.filteredBrands = [...new Set(brandData.map(p => p.brand))].sort();
  }

  applyFilters() {
    this.filterChanged.emit(this.filterForm.value);
  }

  clearFilters() {
    this.filterForm.reset({
      type: '',
      brand: '',
      minPrice: null,
      maxPrice: null
    });
    this.updateDropdowns();
    this.filterChanged.emit(this.filterForm.value); 
  }
}