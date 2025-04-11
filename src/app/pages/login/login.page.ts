// src/app/pages/login/login.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email, password);

        const toast = await this.toastController.create({
          message: 'Inicio de sesión correcto',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        await toast.present();

        this.router.navigateByUrl('/player-list');
      } catch (error: any) {
        const toast = await this.toastController.create({
          message: 'Error: ' + error.message,
          duration: 2500,
          position: 'bottom',
          color: 'danger'
        });
        await toast.present();

        console.error('❌ Error de login:', error);
      }
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
