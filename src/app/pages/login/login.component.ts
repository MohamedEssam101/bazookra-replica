import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { authService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, CheckboxModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);

  private readonly userService = inject(authService);
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ],
    ],
    rememberMe: [false],
  });
  emailControl = this.loginForm.get('email');
  passwordControl = this.loginForm.get('password');
  rememberMeControl = this.loginForm.get('rememberMe');

  login() {
    console.log('login test');
    //  if login form is valid and remeber me ? add the jwt token to cookies from response
    // if not ? only add untill the user close the tab. (session storage)
    console.log(this.loginForm.errors);
    if (this.loginForm.valid) {
      console.log('form is valid');

      // using nonNullable formbuilder , so the data should be either string or undefined , using getRawValue i am assuring its a value
      const { rememberMe, ...userData } = this.loginForm.getRawValue();
      this.userService.onLogin(userData).subscribe();
    } else {
      console.log('form is touched ');
      this.loginForm.markAllAsTouched();
    }
  }
}
