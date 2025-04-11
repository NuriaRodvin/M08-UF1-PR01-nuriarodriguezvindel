// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      IonicModule.forRoot(),
      FormsModule,
      ReactiveFormsModule
    ),
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding())
  ]
};

