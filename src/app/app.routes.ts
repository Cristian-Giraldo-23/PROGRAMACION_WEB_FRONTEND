import { Route } from '@angular/router';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { AuthGuard } from '@core/guard/auth.guard';

export const APP_ROUTE: Route[] = [
  {
    path: '', // Ruta raíz de la aplicación
    component: MainLayoutComponent, // Componente principal que envuelve las rutas protegidas
    canActivate: [AuthGuard], // Guarda que protege las rutas hijas, solo usuarios autenticados pueden acceder
    children: [
      {
        path: 'dashboard', // Ruta para el dashboard
        loadChildren: () =>
          import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTE), // Carga perezosa (lazy loading) de rutas del módulo dashboard
      },
      {
        path: 'page', // Ruta para páginas secundarias o módulos adicionales
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PAGES_ROUTE), // Carga perezosa del módulo pages
      },
    ],
  },
  {
    path: 'authentication', // Ruta pública para autenticación (login, registro, etc.)
    loadChildren: () =>
      import('./authentication/auth.routes').then((m) => m.AUTH_ROUTE), // Carga perezosa de rutas de autenticación
  },
];