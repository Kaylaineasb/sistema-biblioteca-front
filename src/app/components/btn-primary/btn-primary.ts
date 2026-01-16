import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-btn-primary',
  imports: [CommonModule, RouterLink],
  templateUrl: './btn-primary.html',
  styleUrl: './btn-primary.scss',
})
export class BtnPrimary {
  @Input() label: string = 'Botão';
  @Input() icon: string = '';
  @Input() route: string | null = null;
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() onClick = new EventEmitter<void>();

  handleClick(){
    if(!this.disabled){
      this.onClick.emit();
    }
  }
}
