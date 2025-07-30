import { Component, inject, NgModule, OnInit } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [
    AsyncPipe,
    DialogModule,
    ButtonModule,
    InputNumberModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  private readonly categorieService = inject(CategorieService);
  private readonly productsService = inject(ProductService);
  categories$ = this.categorieService.categories$;
  products$ = this.productsService.products$;
  selectedCategory$ = this.productsService.selectedCategory$;
  selectedProduct?: Product;
  private fb = inject(FormBuilder);

  productForm: FormGroup = this.fb.group({
    size: ['single', Validators.required],
    price: [null, Validators.required],
    spiceLevel: [null, Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
  });
  ngOnInit(): void {
    this.categorieService.loadCategories().subscribe();
    this.productsService.loadProducts().subscribe();
  }
  categorieProducts(cId: number) {
    this.productsService.setSelectCategorySubject(cId);
    this.productsService.loadProducts().subscribe();
  }

  getPricingEntries(pricing: Product['pricing']) {
    return Object.entries(pricing || []);
  }
  hasPricing(pricing: Product['pricing']) {
    return pricing && Object.keys(pricing).length > 0;
  }
  visible: boolean = false;

  showProductDialog(product: Product) {
    this.visible = true;
    this.selectedProduct = product;
  }
  get size() {
    return this.productForm.get('size');
  }
  get price() {
    return this.productForm.get('price');
  }

  get spiceLevel() {
    return this.productForm.get('spiceLevel');
  }
  onSubmitProductForm() {
    if (this.productForm.valid) {
      console.log(this.productForm);
      console.log('testing is done');
    } else {
      console.log('error befre submit');
      this.productForm.markAllAsTouched();
    }
  }
  resetForm() {
    this.productForm.reset({
      size: 'single',
      price: null,
      spiceLevel: null,
      quantity: 1,
    });

    this.productForm.markAsUntouched();
  }
}
