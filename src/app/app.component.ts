import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Importa módulos necesarios para el componente standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Propiedad que almacenará la parte final de la URL actual
  currentUrl!: string;

  // Inyecta el servicio Router para suscribirse a los eventos de navegación
  constructor(public _router: Router) {
    // Suscripción a eventos del router para detectar cambios de ruta
    this._router.events.subscribe((routerEvent: Event) => {
      // Cuando comienza la navegación (antes de que la ruta cambie)
      if (routerEvent instanceof NavigationStart) {
        // Extrae la última parte de la URL después del último '/' y la asigna a currentUrl
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf('/') + 1
        );
      }

      // Cuando termina la navegación (la ruta ya cambió)
      if (routerEvent instanceof NavigationEnd) {
        // Actualmente no se realiza ninguna acción aquí
      }

      // Cada vez que se detecta un evento de navegación, hace scroll hacia arriba en la página
      window.scrollTo(0, 0);
    });
  }
}