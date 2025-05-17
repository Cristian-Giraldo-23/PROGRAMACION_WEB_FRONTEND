// Importa el tipo Route para definir rutas en Angular
import { Route } from '@angular/router';

// Importa el componente que se mostrará en la ruta 'main'
import { MainComponent } from './main/main.component';

// Define las rutas del módulo dashboard
export const DASHBOARD_ROUTE: Route[] = [
  {
    // Ruta para acceder al componente principal del dashboard
    path: 'main',
    component: MainComponent
  },
];