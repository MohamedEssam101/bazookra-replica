import { AbstractControl, ValidationErrors } from '@angular/forms';
export class CustomValidators {
  static hasNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    return /[0-9]/.test(control.value) ? null : { hasNumber: true };
  }

  static hasSpecialChar(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    return /[#?!@$%^&*-]/.test(control.value) ? null : { hasSpecialChar: true };
  }
  static hasUpperLower(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);
    return hasUpper && hasLower ? null : { hasUpperLower: true };
  }
}
