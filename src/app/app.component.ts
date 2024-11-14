import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HelloComponent } from './hello.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AddToCartModalComponent } from './components/shared/add-to-cart-modal.component';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AddToCartModalComponent,
    HelloComponent,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  template: `
    <div style="padding: 8px">
      <h1>Teste técnico</h1>
      <app-hello></app-hello>
    </div>

    <mat-toolbar class="custom-toolbar" color="primary">
      <mat-toolbar-row>
        <span>E-Commerce</span>
        <span class="spacer"></span>
        <nav class="menu">
          <a mat-button routerLink="/products">Products</a>
          <a mat-button routerLink="/cart">
            Cart <span class="badge">{{ itemCount }}</span>
          </a>
          <a mat-button routerLink="/checkout">Checkout</a>
          <a mat-button routerLink="/orders">Orders</a>
        </nav>
      </mat-toolbar-row>
    </mat-toolbar>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .custom-toolbar {
        background-color: #1e88e5;
        color: white;
        margin-top: 16px;
      }

      .spacer {
        flex: 1 1 auto;
      }

      .content {
        padding: 24px;
      }

      .menu {
        display: flex;
        align-items: center;
        gap: 16px; /* Espaçamento entre os itens do menu */
      }

      nav a {
        color: white;
        text-decoration: none;
        display: flex;
        align-items: center;
      }

      .badge {
        background-color: #4caf50; /* Cor verde */
        color: white;
        border-radius: 50%;
        padding: 2px 8px;
        font-size: 12px;
        margin-left: 8px; /* Espaço entre "Cart" e o badge */
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  itemCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.itemCount$.subscribe(count => {
      this.itemCount = count;
    });
  }
}
