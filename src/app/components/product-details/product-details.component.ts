import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { AddToCartModalComponent } from '../shared/add-to-cart-modal.component';
import { CustomButtonComponent } from '../shared/custom-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, AddToCartModalComponent, CustomButtonComponent],
  template: `
    <div *ngIf="product" class="product-details-container">
      <div class="image-container">
        <img [src]="product.image" alt="{{ product.title }}" />
      </div>
      <div class="details-container">
        <h2>{{ product.title }}</h2>
        <p>Category: {{ product.category }}</p>
        <p>{{ product.description }}</p>
        <p class="price">Price: {{ product.price | currency }}</p>

        <!-- Botão personalizado -->
        <app-custom-button
          label="Adicionar ao Carrinho"
          backgroundColor="#28a745"
          size="14px"
          (click)="addToCart()"
        ></app-custom-button>
      </div>
    </div>
    <div *ngIf="!product">Loading product details...</div>

    <!-- Modal Reutilizável -->
    <app-add-to-cart-modal #modal></app-add-to-cart-modal>
  `,
  styles: [
    `
      .product-details-container {
        display: flex;
        align-items: flex-start;
        gap: 24px;
        max-width: 800px;
        margin: auto;
        padding: 16px;
      }

      .image-container {
        flex: 1;
        max-width: 300px;
      }

      .image-container img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .details-container {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .details-container h2 {
        margin: 0;
        font-size: 24px;
      }

      .price {
        font-weight: bold;
        font-size: 18px;
        color: #333;
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
