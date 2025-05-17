// Importa las utilidades necesarias de Angular para pruebas unitarias
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

// Importa el componente que se va a probar
import { Page404Component } from './page404.component';

// Inicia la definición del conjunto de pruebas para el componente Page404
describe('Page404Component', () => {

  // Declara las variables para la instancia del componente y su fixture
  let component: Page404Component;
  let fixture: ComponentFixture<Page404Component>;

  // Configura el módulo de pruebas antes de cada prueba, de forma asíncrona
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // Registra el componente en la configuración del módulo de prueba
      imports: [Page404Component]
    }).compileComponents(); // Compila los componentes declarados
  }));

  // Crea una instancia del componente antes de cada prueba
  beforeEach(() => {
    fixture = TestBed.createComponent(Page404Component); // Crea el fixture del componente
    component = fixture.componentInstance; // Obtiene la instancia del componente desde el fixture
    fixture.detectChanges(); // Ejecuta la detección de cambios para inicializar el componente
  });

  // Define una prueba: el componente debería crearse correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente exista
  });

});