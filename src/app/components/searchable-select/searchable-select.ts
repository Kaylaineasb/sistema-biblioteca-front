import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-searchable-select',
  standalone: true,
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
  @Input() loading: boolean = false;
  
  @Input() page: number = 0;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 5;

  @Output() search = new EventEmitter<string>();
  
  @Output() pageChange = new EventEmitter<number>(); 

  typeaheadInput$ = new Subject<string>();

  constructor() {
    this.typeaheadInput$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(termo => {
      this.search.emit(termo); 
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get isFirstPage(): boolean {
    return this.page === 0;
  }

  get isLastPage(): boolean {
    return (this.page + 1) >= this.totalPages;
  }

  prevPage(event: Event) {
    event.stopPropagation();
    if (!this.isFirstPage) {
      this.pageChange.emit(this.page - 1);
    }
  }

  nextPage(event: Event) {
    event.stopPropagation();
    if (!this.isLastPage) {
      this.pageChange.emit(this.page + 1);
    }
  }
}