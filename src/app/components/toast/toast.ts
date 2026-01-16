import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ToastInfo, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class ToastComponent implements OnInit{
  private toastService = inject(ToastService);

  toasts: ToastInfo[] = [];

  ngOnInit() {
    this.toastService.toastState.subscribe((toast)=>{
      this.toasts.push(toast);
      setTimeout(()=> this.remove(toast),3000);
    });
  }

  remove(toast: ToastInfo){
    this.toasts = this.toasts.filter( t => t !== toast);
  }
}
