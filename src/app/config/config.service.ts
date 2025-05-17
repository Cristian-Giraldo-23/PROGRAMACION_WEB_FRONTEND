// Importa el decorador Injectable para definir servicios en Angular
import { Injectable } from '@angular/core';

// Importa la interfaz de configuración para tipar correctamente los datos
import { InConfiguration } from '../core/models/config.interface';

// Declara el servicio como inyectable en el root (disponible globalmente en toda la app)
@Injectable({
  providedIn: 'root',
})
export class ConfigService {

  // Propiedad pública donde se almacenará la configuración
  public configData!: InConfiguration;

  // Constructor: se ejecuta cuando se instancia el servicio
  constructor() {
    this.setConfigData(); // Establece configuración inicial por defecto
  }

  // Método del ciclo de vida de Angular (no tiene efecto aquí ya que no es un componente)
  ngOnInit() {
    this.loadConfigData(); // (Este método no se ejecutará automáticamente en servicios)
  }

  // Método para establecer valores por defecto en la configuración
  setConfigData() {
    this.configData = {
      layout: {
        rtl: false, // Dirección de texto: false para izquierda a derecha
        variant: 'light', // Tema: 'light' o 'dark'
        theme_color: 'cyan', // Color principal del tema
        logo_bg_color: 'white', // Color de fondo del logo
        sidebar: {
          collapsed: false, // Colapsar menú lateral
          backgroundColor: 'light', // Color del fondo del sidebar
        },
      },
    };

    // Guarda la configuración en localStorage como cadena JSON
    localStorage.setItem('configData', JSON.stringify(this.configData));
  }

  // Método para cargar configuración desde localStorage
  loadConfigData() {
    const configData = localStorage.getItem('configData');

    if (configData) {
      // Si existe, parsea el string JSON y lo asigna a configData
      this.configData = JSON.parse(configData);
    } else {
      // Si no existe, guarda la configuración por defecto
      this.setConfigData();
    }
  }
}