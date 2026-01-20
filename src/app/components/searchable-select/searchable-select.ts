import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-searchable-select',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './searchable-select.html',
  styleUrl: './searchable-select.scss',
})
export class SearchableSelectComponent {
  @Input() label: string = '';
  @Input() placeholder: string = 'Selecione...';
  @Input() icon: string = '';

  @Input() items: any[] = [];
  @Input() bindLabel: string = 'nome';
  @Input() bindValue: string = 'id';

  @Input() control!: FormControl;
  @Input() notFoundText: string = 'Nenhum item encontrado!';
}
