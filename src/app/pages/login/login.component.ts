import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, CheckboxModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  private readonly userService = inject(UserService);
  loginForm = this.fb.group({
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
      this.userService.onLogin(this.loginForm.value);
    } else {
      console.log('form is touched ');
      this.loginForm.markAllAsTouched();
    }
  }
}
