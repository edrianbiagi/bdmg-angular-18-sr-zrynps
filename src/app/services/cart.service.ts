import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private itemCountSubject = new BehaviorSubject<number>(0);
  itemCount$ = this.itemCountSubject.asObservable();

  constructor() {}

  addToCart(product: Product): void {
    const itemIndex = this.cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (itemIndex > -1) {
    } else {
      this.cartItems.push(product);
    }

    this.updateCartState();
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.updateCartState();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCartState();
  }

  private updateCartState(): void {
    this.cartItemsSubject.next([...this.cartItems]);
    this.itemCountSubject.next(this.cartItems.length);
  }
}
