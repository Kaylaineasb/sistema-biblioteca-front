import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomAlertComponent } from './components/custom-alert/custom-alert';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomAlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('auth-base');
}
