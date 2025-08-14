import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { authService } from '../../services/auth.service';
import { min } from 'rxjs';
import { CustomValidators } from '../../shared/validators/custom-validators';
import { RegisterForm, User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CheckboxModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(NonNullableFormBuilder);

  private readonly user_Service = inject(authService);

  private readonly router = inject(Router);

  registerForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
        Validators.pattern(/^[a-zA-Z\s\-']+$/),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],

    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.hasNumber,
        CustomValidators.hasSpecialChar,
        CustomValidators.hasUpperLower,
      ],
    ],
    confirmPassword: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ],
    ],
    approveTerms: [false, Validators.required],
  });

  firstNameControl = this.registerForm.get('firstName');
  emailControl = this.registerForm.get('email');

  phoneControl = this.registerForm.get('mobile');
  passwordControl = this.registerForm.get('password');
  confirmPasswordControl = this.registerForm.get('confirmPassword');
  approveTermsControl = this.registerForm.get('approveTerms');

  onSubmit() {
    if (this.CheckForm()) {
      this.submitForm();
    } else {
      this.handleInvalidForm();
    }
  }

  private CheckForm(): boolean {
    return (
      this.registerForm.valid &&
      this.passwordMatchValidator() &&
      this.approveTermsValidator()
    );
  }
  private passwordMatchValidator(): boolean {
    return this.passwordControl?.value === this.confirmPasswordControl?.value;
  }

  private approveTermsValidator(): boolean {
    return this.approveTermsControl?.value === true;
  }
  private submitForm() {
    const { confirmPassword, approveTerms, ...userData } =
      this.registerForm.getRawValue();

    this.user_Service.onRegister(userData);
    console.log(this.registerForm.value);
    this.router.navigate(['/login']);
    this.registerForm.reset();
  }
  private handleInvalidForm() {
    console.log('marked all as touched');
    this.registerForm.markAllAsTouched();
  }
}
