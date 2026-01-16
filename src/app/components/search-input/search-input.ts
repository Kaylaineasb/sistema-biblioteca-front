import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [CommonModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput {
  @Input() placeholder: string = 'Pesquisar...';

  @Output() search = new EventEmitter<string>();

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.search.emit(value);
  }
}
