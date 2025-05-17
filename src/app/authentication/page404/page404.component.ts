// Importa el decorador Component de Angular para definir un componente
import { Component } from '@angular/core';

// Importa el servicio Router para poder redirigir entre rutas
import { Router } from '@angular/router';

// Importa el módulo de botones de Angular Material
import { MatButtonModule } from '@angular/material/button';

// Importa el módulo de formularios para usar formularios en el componente
import { FormsModule } from '@angular/forms';

// Decorador que define los metadatos del componente
@Component({
    selector: 'app-page404', // Selector HTML del componente
    templateUrl: './page404.component.html', // Ruta del archivo de plantilla HTML
    styleUrls: ['./page404.component.scss'], // Estilos asociados al componente
    standalone: true, // Indica que este componente es independiente (sin módulo)
    imports: [ // Módulos importados necesarios para la plantilla
        FormsModule,
        MatButtonModule,
    ],
})

// Definición de la clase del componente
export class Page404Component {

  // Inyección del servicio Router mediante el constructor
  constructor(
    private _router: Router
  ) {}

  // Método que redirige al usuario a la ruta principal del dashboard
  redirectHome() {
    this._router.navigate(['/dashboard/main']);
  }
}