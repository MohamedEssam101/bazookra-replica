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
import { CartService } from '../../services/cart.service';
import { CustomCurrencyPipe } from '../../shared/pipes/custom-currency.pipe';

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
    CustomCurrencyPipe,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  private readonly _categorieService = inject(CategorieService);
  private readonly _productsService = inject(ProductService);
  private readonly _cartService = inject(CartService);
  cartItems$ = this._cartService.userCart$;
  categories$ = this._categorieService.categories$;
  products$ = this._productsService.products$;

  totalPrice$ = this._cartService.calculateTotalPrice();
  selectedCategory$ = this._productsService.selectedCategory$;
  selectedProduct?: Product;

  private fb = inject(FormBuilder);

  productForm: FormGroup = this.fb.group({
    name: [null],
    size: ['single', Validators.required],
    price: [null, Validators.required],
    spiceLevel: ['regular', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    product_id: [null],
  });
  ngOnInit(): void {
    this._categorieService.loadCategories().subscribe();
    this._productsService.loadProducts().subscribe();

    this._cartService.userCart$.subscribe((res) => {
      console.log(res);
    });
  }
  categorieProducts(cId: number) {
    this._productsService.setSelectCategorySubject(cId);
    this._productsService.loadProducts().subscribe();
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

  sizeControl = this.productForm.get('size');
  priceControl = this.productForm.get('price');
  spiceLevelControl = this.productForm.get('spiceLevel');
  onSubmitProductForm(pId: number, pName: string) {
    if (this.productForm.valid) {
      console.log('testing is done');
      this.addToCart(pId, pName);
      this.visible = false;
    } else {
      console.log('error befre submit');
      this.productForm.markAllAsTouched();
    }
  }
  resetForm() {
    this.productForm.reset({
      size: 'single',
      price: null,
      spiceLevel: 'regular',
      quantity: 1,
    });

    this.productForm.markAsUntouched();
  }

  addToCart(pId: number, pName: string) {
    console.log(pId);
    this.productForm.patchValue({ product_id: pId, name: pName });

    this._cartService.addItemToCart(this.productForm.value);
  }
  onSizeChange(entry1: string, entry2: number) {
    console.log('the entry is ');
    this.productForm.patchValue({ size: entry1, price: entry2 });
  }
}
