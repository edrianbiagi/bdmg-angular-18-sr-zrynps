import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h2>Lista de Pedidos</h2>
      <div *ngFor="let order of orders" class="order">
        <p><strong>Nome:</strong> {{ order.name }}</p>
        <p><strong>Endereço:</strong> {{ order.logradouro }}, {{ order.bairro }}, {{ order.localidade }} - {{ order.uf }}</p>
        <p><strong>Itens:</strong></p>
        <ul>
          <li *ngFor="let item of order.items">
            {{ item.title }} - {{ item.price | currency }}
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .order {
        border: 1px solid #ccc;
        padding: 8px;
        margin-bottom: 8px;
      }
    `,
  ],
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders = this.orderService.getOrders();
  }
}
