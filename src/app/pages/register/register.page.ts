// src/app/pages/register/register.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      try {
        await this.authService.register(email, password);

        const toast = await this.toastController.create({
          message: 'Cuenta creada correctamente',
          duration: 2000,
          position: 'bottom',
          color: 'success'
        });
        await toast.present();

        this.router.navigateByUrl('/login');
      } catch (error: any) {
        const toast = await this.toastController.create({
          message: 'Error: ' + error.message,
          duration: 2500,
          position: 'bottom',
          color: 'danger'
        });
        await toast.present();

        console.error('❌ Error al registrarse:', error);
      }
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
