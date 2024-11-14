import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddToCartModalComponent } from '../shared/add-to-cart-modal/add-to-cart-modal.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, AddToCartModalComponent],
  template: `
    <div class="product-list">
      <div *ngIf="products.length === 0">Loading products...</div>
      <div class="product-grid">
        <div *ngFor="let product of products" class="product-card">
          <a [routerLink]="['/products', product.id]">
            <img [src]="product.image" alt="{{ product.title }}" />
            <h3>{{ product.title }}</h3>
          </a>
          <p>{{ product.description }}</p>
          <p>Price: {{ product.price | currency }}</p>
          <button mat-button color="primary" (click)="addToCart(product)">Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>

    <!-- Modal Reutilizável -->
    <app-add-to-cart-modal #modal></app-add-to-cart-modal>
  `,
  styles: [
    `
      .product-list {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        width: 100%;
        max-width: 1200px;
      }

      .product-card {
        border: 1px solid #ccc;
        padding: 16px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .product-card img {
        max-width: 100%;
        height: auto;
      }
    `,
  ],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  // Referência ao modal usando ViewChild
  @ViewChild('modal') modal!: AddToCartModalComponent;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.modal.showModal(`${product.title} foi adicionado ao carrinho!`);
  }
}
