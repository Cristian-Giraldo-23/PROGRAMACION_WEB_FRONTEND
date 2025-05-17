import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;             // Variable para la instancia del componente
  let fixture: ComponentFixture<HeaderComponent>; // Variable para el fixture que contiene el componente y su entorno

  // Antes de cada test, configuramos el módulo de prueba de Angular
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent]  // Importamos el componente para la prueba
    }).compileComponents();       // Compilamos los componentes declarados
  }));

  // Antes de cada test, creamos la instancia del componente y detectamos cambios
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent); // Creamos el componente en el entorno de prueba
    component = fixture.componentInstance;              // Obtenemos la instancia del componente
    fixture.detectChanges();                             // Detectamos cambios para inicializar el binding y el DOM
  });

  // Test simple para verificar que el componente fue creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();// Esperamos que la instancia del componente exista (sea truthy)
  });
});