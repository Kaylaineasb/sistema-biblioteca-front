import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastInfo{
  message:string;
  type: 'sucess' | 'error' | 'info';
  id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastState = new Subject<ToastInfo>();

  show(message: string, type: 'sucess' | 'error' | 'info'){
    this.toastState.next({
      message,
      type,
      id:Date.now()
    });
  }

  sucess(message:string){
    this.show(message, 'sucess');
  }

  error(message:string){
    this.show(message, 'error');
  }

  info(message:string){
    this.show(message,'info');
  }
}
