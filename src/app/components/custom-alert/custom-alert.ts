import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AlertOptions, CustomAlertService } from '../../services/custom-alert.service';

@Component({
  selector: 'app-custom-alert',
  imports: [CommonModule],
  templateUrl: './custom-alert.html',
  styleUrl: './custom-alert.scss',
})
export class CustomAlertComponent implements OnInit{
  private alertService = inject(CustomAlertService);
  
  options: AlertOptions | null = null;
  isVisible = false;

  ngOnInit(){
    this.alertService.alertState.subscribe((opts)=>{
      this.options = opts;
      this.isVisible = !!opts;
    });
  }

  onConfirm(){
    this.alertService.close(true);
  }

  onCancel(){
    this.alertService.close(false);
  }
}
