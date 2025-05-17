import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { ApplicationConfig, importProvidersFrom } from '@angular/core';

import { APP_ROUTE } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { JwtInterceptor } from '@core/interceptor/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // Provee el cliente HTTP para realizar peticiones HTTP
    provideHttpClient(),

    // Provee el enrutador con las rutas definidas en APP_ROUTE
    provideRouter(APP_ROUTE),

    // Provee animaciones para la app (Angular Material y Angular en general)
    provideAnimations(),

    // Configura la estrategia de URL para que use rutas 'normales' sin # (PathLocationStrategy)
    { provide: LocationStrategy, useClass: PathLocationStrategy },

    // Configura el adaptador de fechas para usar Moment.js en lugar del adaptador por defecto
    { provide: DateAdapter, useClass: MomentDateAdapter },

    // Define el formato para las fechas en Material Datepicker usando Moment.js
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD', // Formato esperado para entrada
        },
        display: {
          dateInput: 'YYYY-MM-DD', // Formato para mostrar en input
          monthYearLabel: 'YYYY MMM', // Formato para mes y año en label
          dateA11yLabel: 'LL', // Etiqueta accesible para fecha completa
          monthYearA11yLabel: 'YYYY MMM', // Etiqueta accesible para mes y año
        },
      },
    },

    // Registra un interceptor HTTP para incluir JWT en las peticiones automáticamente
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    // Importa el módulo Feather Icons con todos los íconos disponibles
    importProvidersFrom(FeatherModule.pick(allIcons)),

    // Provee configuración para gráficos usando ng2-charts con registradores por defecto
    provideCharts(withDefaultRegisterables()),

    // Permite que el HttpClient utilice interceptores definidos por inyección de dependencias
    provideHttpClient(withInterceptorsFromDi()),

    // Provee animaciones de manera asíncrona para optimización
    provideAnimationsAsync(),
  ],
};