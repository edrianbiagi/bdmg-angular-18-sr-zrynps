import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [ngStyle]="{
        'background-color': backgroundColor,
        'font-size': size
      }"
      class="custom-button"
      (click)="handleClick()"
    >
      {{ label }}
    </button>
  `,
  styles: [
    `
      .custom-button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        color: white;
      }
    `,
  ],
})
export class CustomButtonComponent {
  @Input() label = 'Button';
  @Input() backgroundColor = '#007bff'; // Cor padrão
  @Input() size = '16px'; // Tamanho de fonte padrão
  @Output() click = new EventEmitter<void>();

  handleClick(): void {
    this.click.emit();
  }
}
