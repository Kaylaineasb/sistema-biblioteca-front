import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertOptions{
  title:string;
  message: string;
  type: 'sucess' | "danger" | "warning" | "info";
  confirmText?: string;
  cancelText?: string;
}

@Injectable({
  providedIn: 'root',
})


export class CustomAlertService {
  alertState = new Subject<AlertOptions | null>();

  private resolveRef: ((value:boolean)=> void) | null = null;

  confirm(
    title: string,
    message: string,
    type: 'sucess' | 'danger' | 'warning' | 'info' = 'warning'
  ): Promise<boolean>{
    const options: AlertOptions = {
       title,
       message,
       type,
       confirmText: 'Confirmar',
       cancelText: 'Cancelar'
    };
    this.alertState.next(options);

    return new Promise<boolean>((resolve)=>{
      this.resolveRef = resolve;
    });
  }

  close(result: boolean){
    if(this.resolveRef){
      this.resolveRef(result);
      this.resolveRef = null;
    }

    this.alertState.next(null);
  }
}
