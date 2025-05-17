// Importa el tipo 'Route' de Angular para definir rutas
import { Route } from "@angular/router";

// Importa el componente de inicio de sesión
import { SigninComponent } from "./signin/signin.component";

// Importa el componente para mostrar el error 404
import { Page404Component } from "./page404/page404.component";

// Define las rutas disponibles en el módulo de autenticación
export const AUTH_ROUTE: Route[] = [

  // Ruta vacía: redirige a "signin" si no se especifica ninguna ruta
  {
    path: "",
    redirectTo: "signin",
    pathMatch: "full", // Coincide únicamente si la URL es exactamente ""
  },

  // Ruta específica para mostrar el formulario de inicio de sesión
  {
    path: "signin",
    component: SigninComponent,
  },

  // Ruta específica para mostrar el componente de error 404 personalizado
  {
    path: "page404",
    component: Page404Component,
  },

  // Ruta comodín: cualquier otra ruta no definida redirige a "page404"
  {
    path: '**',
    redirectTo: 'page404',
    pathMatch: 'full', // Coincide exactamente con rutas completas desconocidas
  },

];