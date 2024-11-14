import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: any[] = [];

  constructor() {
    this.loadOrders();
  }

  addOrder(order: any): void {
    this.orders.push(order);
    this.saveOrders();
  }

  getOrders(): any[] {
    return this.orders;
  }

  private saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  private loadOrders(): void {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    }
  }
}
