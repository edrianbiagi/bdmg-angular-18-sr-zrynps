import { Component, OnInit, ViewChild } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { OrderService } from "../../services/order.service";
import { Product } from "../../models/product.model";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { AddToCartModalComponent } from "../shared/add-to-cart-modal.component";
import { CustomButtonComponent } from "../shared/custom-button.component";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddToCartModalComponent,
    CustomButtonComponent,
  ],
  template: `
    <div *ngIf="cartItems.length > 0">
      <h2>Checkout</h2>
      <ul>
        <li *ngFor="let item of cartItems">
          {{ item.title }} - {{ item.price | currency }}
        </li>
      </ul>

      <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
        <!-- Seção Superior: Informações Pessoais -->
        <div class="form-section">
          <label>
            Nome Completo:
            <input formControlName="name" required />
            <div *ngIf="isFieldInvalid('name')" class="error-message">
              Este campo é obrigatório
            </div>
          </label>
          <label>
            CPF:
            <input formControlName="cpf" required />
            <div *ngIf="isFieldInvalid('cpf')" class="error-message">
              Este campo é obrigatório
            </div>
          </label>
          <label>
            Email:
            <input formControlName="email" type="email" required />
            <div *ngIf="isFieldInvalid('email')" class="error-message">
              Este campo é obrigatório
            </div>
          </label>
          <label>
            Telefone:
            <input formControlName="phone" required />
            <div *ngIf="isFieldInvalid('phone')" class="error-message">
              Este campo é obrigatório
            </div>
          </label>
        </div>

        <!-- Seção Inferior: Endereço -->
        <div class="form-section">
          <label>
            CEP:
            <input formControlName="cep" (change)="onCepChange()" required />
            <div *ngIf="isFieldInvalid('cep')" class="error-message">
              Este campo é obrigatório
            </div>
          </label>
          <label>
            Logradouro:
            <input formControlName="logradouro" required />
            <div *ngIf="isFieldInvalid('logradouro')" class="error-message">
              Este campo é obrigatório
            </div>
          </label>
          <label>
            Bairro:
            <input formControlName="bairro" required />
            <div *ngIf="isFieldInvalid('bairro')" class="error-message">
              Este campo é obrigatório
            </div>
          </label>
          <label>
            Localidade:
            <input formControlName="localidade" required />
            <div *ngIf="isFieldInvalid('localidade')" class="error-message">
              Este campo é obrigatório
            </div>
          </label>
          <label>
            UF:
            <input formControlName="uf" required />
            <div *ngIf="isFieldInvalid('uf')" class="error-message">
              Este campo é obrigatório
            </div>
          </label>
        </div>

        <!-- Botão de Finalizar Pedido Personalizado -->
        <app-custom-button
          label="Finalizar Pedido"
          backgroundColor="#007bff"
          size="16px"
          (click)="onSubmit()"
        ></app-custom-button>
      </form>
    </div>
    <div *ngIf="cartItems.length === 0">
      <p>O carrinho está vazio.</p>
    </div>

    <!-- Modal de Confirmação de Pedido -->
    <app-add-to-cart-modal #modal></app-add-to-cart-modal>
  `,
  styles: [
    `
      .form-section {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 16px;
      }
      .form-section label {
        flex: 1 1 200px;
        display: flex;
        flex-direction: column;
      }
      .error-message {
        color: red;
        font-size: 12px;
        margin-top: 4px;
      }
    `,
  ],
})
export class CheckoutComponent implements OnInit {
  cartItems: Product[] = [];
  checkoutForm: FormGroup;

  // Referência ao modal
  @ViewChild("modal") modal!: AddToCartModalComponent;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.checkoutForm = this.fb.group({
      name: ["", Validators.required],
      cpf: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      cep: ["", Validators.required],
      logradouro: ["", Validators.required],
      bairro: ["", Validators.required],
      localidade: ["", Validators.required],
      uf: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  onCepChange(): void {
    const cep = this.checkoutForm.get("cep")?.value;
    if (cep && cep.length === 8) {
      this.http
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe((data: any) => {
          this.checkoutForm.patchValue({
            logradouro: data.logradouro || "",
            bairro: data.bairro || "",
            localidade: data.localidade || "",
            uf: data.uf || "",
          });
        });
    }
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const orderData = {
        ...this.checkoutForm.value,
        items: this.cartItems,
      };
      this.orderService.addOrder(orderData);
      this.cartService.clearCart();
      this.modal.showModal("Pedido realizado com sucesso!");
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return !!field?.invalid && !!field?.touched;
  }
}
