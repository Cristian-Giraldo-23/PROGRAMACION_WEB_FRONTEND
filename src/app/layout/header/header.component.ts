import { DOCUMENT, NgClass } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConfigService } from '@config';
import { InConfiguration, AuthService } from '@core';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    RouterLink,              // Importa la directiva para enlaces del router
    NgClass,                 // Para manipulación dinámica de clases CSS
    MatButtonModule,         // Botones de Angular Material
    MatMenuModule,           // Menús de Angular Material
    FeatherIconsComponent,   // Componente de iconos Feather
  ],
})
export class HeaderComponent implements OnInit {
  public config!: InConfiguration;     // Configuración general de la app
  isNavbarCollapsed = true;            // Estado del navbar colapsado en vista móvil
  isOpenSidebar?: boolean;             // Estado para sidebar abierto (opcional)
  docElement?: HTMLElement;            // Referencia al elemento raíz del documento
  isFullScreen = false;                // Estado para pantalla completa
  userLogged: string | undefined = ''; // Nombre del usuario logueado

  constructor(
    @Inject(DOCUMENT) private readonly document: Document, // Inyecta el documento para manipulación DOM
    private readonly renderer: Renderer2,                   // Renderer para manipulación segura del DOM
    public readonly elementRef: ElementRef,                 // Referencia al elemento del componente
    private readonly configService: ConfigService,          // Servicio de configuración
    private readonly authService: AuthService,              // Servicio de autenticación
    private readonly router: Router                          // Router para navegación
  ) {
    // Obtener el nombre del usuario logueado desde el servicio de auth
    this.userLogged = this.authService.getAuthFromSessionStorage().nombre;
  }

  ngOnInit() {
    // Cargar configuración guardada y referencia al elemento html raíz
    this.config = this.configService.configData;
    this.docElement = document.documentElement;
  }

  // Método para activar o salir del modo pantalla completa
  callFullscreen() {
    if (!this.isFullScreen) {
      if (this.docElement?.requestFullscreen != null) {
        this.docElement?.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;  // Cambiar el estado de pantalla completa
  }

  // Método para abrir o cerrar menú lateral en vista móvil agregando o removiendo clases CSS
  mobileMenuSidebarOpen(event: Event, className: string) {
    const hasClass = (event.target as HTMLInputElement).classList.contains(
      className
    );
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }

  // Método para colapsar o expandir el sidebar principal, guardando estado en localStorage
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'false');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'true');
    }
  }

  // Método para cerrar sesión usando el servicio de autenticación
  logout() {
    this.authService.logout();
  }
}