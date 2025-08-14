import { FormControl, FormGroup } from '@angular/forms';

export interface User {
  id?: number;
  email: string;
  password: string;
  name?: string;
  phone?: string; // Make sure this matches your form field
  created_at?: string;
  updated_at?: string;
}
export interface RegisterForm {
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  password: FormControl<string>;
  confirmPassword?: FormControl<string>; // Optional - can be removed
  approveTerms?: FormControl<boolean>; // Optional - can be removed
}
