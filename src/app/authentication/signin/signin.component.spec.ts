// Importa las utilidades necesarias para realizar pruebas unitarias en Angular
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

// Importa el componente que se va a probar
import { SigninComponent } from './signin.component';

// Define el grupo de pruebas para el componente SigninComponent
describe('SigninComponent', () => {

  // Variables para la instancia del componente y su fixture
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  // Configura el entorno de pruebas de forma asíncrona antes de ejecutar las pruebas
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // Importa el componente que se va a probar
      imports: [SigninComponent]
    }).compileComponents(); // Compila el componente y sus dependencias
  }));

  // Crea la instancia del componente antes de cada prueba
  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent); // Crea el fixture del componente
    component = fixture.componentInstance; // Obtiene la instancia desde el fixture
    fixture.detectChanges(); // Ejecuta detección de cambios para inicializar el componente
  });

  // Prueba que verifica si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Espera que el componente exista (sea "truthy")
  });

});