import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();
  const token = user ? 'token-ficticio-123' : null;

  let requestToHandle = req;

  if (token) {
    requestToHandle = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(requestToHandle).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        console.warn('Sessão expirada ou inválida. Deslogando...');
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};