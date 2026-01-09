import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('usuTxSenha');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }

  if (confirmPassword?.hasError('passwordMismatch')) {
     delete confirmPassword.errors?.['passwordMismatch'];
     if (!Object.keys(confirmPassword.errors || {}).length) confirmPassword.setErrors(null);
  }
  return null;
};