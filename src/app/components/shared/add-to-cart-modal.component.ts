import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-to-cart-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" *ngIf="isVisible">
      <div class="modal-content">
        <p>{{ message }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
      }

      .modal-content {
        background: #e6f7e6;
        padding: 24px;
        border-radius: 8px;
        text-align: center;
        max-width: 300px;
        width: 100%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }

      .modal-content p {
        font-size: 18px;
        margin-bottom: 16px;
        color: #2f5933;
      }
    `,
  ],
})
export class AddToCartModalComponent implements OnInit {
  @Input() message = '';
  isVisible = false;

  ngOnInit(): void {}

  showModal(message: string): void {
    this.message = message;
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }
}
