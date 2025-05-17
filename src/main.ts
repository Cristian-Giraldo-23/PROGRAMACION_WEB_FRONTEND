// Importa la función para arrancar la aplicación Angular
import { bootstrapApplication } from '@angular/platform-browser';

// Importa el componente raíz principal de la aplicación
import { AppComponent } from 'app/app.component';

// Importa la configuración global de la aplicación (proveedores, rutas, etc.)
import { appConfig } from 'app/app.config';

// Arranca la aplicación Angular con el componente raíz y la configuración proporcionada
bootstrapApplication(AppComponent, appConfig)
  .catch((err) =>
    // Captura y muestra cualquier error que ocurra durante el arranque
    console.error(err)
  );