import { Component, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Product } from "../../models/product.model";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { CustomButtonComponent } from "../shared/custom-button.component";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, RouterModule, CustomButtonComponent],
  template: `
    <div class="cart">
      <h2>Carrinho</h2>
      <div *ngIf="cartItems.length === 0">Carrinho Vazio</div>
      <ul *ngIf="cartItems.length > 0" class="cart-list">
        <li *ngFor="let item of cartItems" class="cart-item">
          <img [src]="item.image" alt="{{ item.title }}" />
          <h3>{{ item.title }}</h3>
          <p>Price: {{ item.price | currency }}</p>
        </li>
      </ul>
      <div *ngIf="cartItems.length > 0" class="button-group">
        <app-custom-button
          label="Remover Tudo"
          backgroundColor="#dc3545"
          size="14px"
          (click)="clearCart()"
        ></app-custom-button>

        <app-custom-button
          label="Finalizar Compra"
          backgroundColor="#007bff"
          size="14px"
          (click)="goToCheckout()"
        ></app-custom-button>
      </div>
    </div>
  `,
  styles: [
    `
      .cart {
        max-width: 600px;
        margin: auto;
      }
      .cart-list {
        list-style-type: none;
        padding: 0;
      }
      .cart-item {
        display: flex;
        align-items: center;
        gap: 8px;
        border-bottom: 1px solid #ccc;
        padding: 8px 0;
      }
      .cart-item img {
        width: 50px;
        height: 50px;
      }
      .button-group {
        margin-top: 16px;
        display: flex;
        gap: 8px; /* Espaço entre os botões */
      }
    `,
  ],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  goToCheckout(): void {
    this.router.navigate(["/checkout"]);
  }
}
