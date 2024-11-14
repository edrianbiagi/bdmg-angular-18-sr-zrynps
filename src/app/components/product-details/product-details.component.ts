import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { AddToCartModalComponent } from '../shared/add-to-cart-modal/add-to-cart-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, AddToCartModalComponent],
  template: `
    <div *ngIf="product">
      <h2>{{ product.title }}</h2>
      <img [src]="product.image" alt="{{ product.title }}" />
      <p>{{ product.description }}</p>
      <p>Category: {{ product.category }}</p>
      <p>Price: {{ product.price | currency }}</p>
      <button mat-button color="primary" (click)="addToCart()">Adicionar ao Carrinho</button>
    </div>
    <div *ngIf="!product">Loading product details...</div>

    <!-- Modal Reutilizável -->
    <app-add-to-cart-modal #modal></app-add-to-cart-modal>
  `,
  styles: [
    `
      div {
        max-width: 600px;
        margin: auto;
        text-align: center;
      }

      img {
        max-width: 100%;
        height: auto;
        margin-bottom: 16px;
      }
    `,
  ],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  @ViewChild('modal') modal!: AddToCartModalComponent;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe((data: Product) => {
      this.product = data;
    });
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.modal.showModal(`${this.product.title} foi adicionado ao carrinho!`);
    }
  }
}
