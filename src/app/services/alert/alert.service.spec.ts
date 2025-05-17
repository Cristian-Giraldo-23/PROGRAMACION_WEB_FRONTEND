// Importa TestBed, una herramienta de Angular para crear entornos de prueba
import { TestBed } from '@angular/core/testing';

// Importa el servicio que vas a probar
import { AlertService } from './alert.service';

// Describe el grupo de pruebas para el servicio AlertService
describe('AlertService', () => {
  // Variable que contendrá la instancia del servicio durante las pruebas
  let service: AlertService;

  // beforeEach se ejecuta antes de cada prueba para configurar el entorno
  beforeEach(() => {
    // Configura el módulo de pruebas (sin dependencias adicionales en este caso)
    TestBed.configureTestingModule({});

    // Inyecta una instancia del servicio a través del TestBed
    service = TestBed.inject(AlertService);
  });

  // Caso de prueba que verifica que el servicio fue creado correctamente
  it('should be created', () => {
    // Se espera que la instancia del servicio sea verdadera (es decir, que exista)
    expect(service).toBeTruthy();
  });
});