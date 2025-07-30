import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [CheckboxModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);

  private readonly user_Service = inject(UserService);
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    mobile: [
      null,
      [
        Validators.required,
        Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/),
      ],
    ],
    email: [null, Validators.required],
    password: [
      null,
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ],
    ],
    confirmPassword: [
      null,
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
  mobileControl = this.registerForm.get('mobile');
  passwordControl = this.registerForm.get('password');
  confirmPasswordControl = this.registerForm.get('confirmPassword');
  approveTermsControlControl = this.registerForm.get('approveTerms');

  passwordMatchValidator(): boolean {
    return this.passwordControl?.value === this.confirmPasswordControl?.value;
  }

  onSubmit() {
    if (this.registerForm.valid && this.passwordMatchValidator()) {
      console.log('every thing is right');
      this.user_Service.onRegister(this.registerForm.value);
      console.log(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
