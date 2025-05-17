// Importa TestBed, una utilidad de Angular para configurar e inicializar entornos de prueba
import { TestBed } from '@angular/core/testing';

// Importa el servicio que se va a probar
import { UserService } from './users.service';

// Describe un conjunto de pruebas para el servicio UserService
describe('UsersService', () => {
  // Variable para almacenar la instancia del servicio
  let service: UserService;

  // beforeEach se ejecuta antes de cada prueba individual
  beforeEach(() => {
    // Configura el entorno de prueba (test module)
    TestBed.configureTestingModule({});
    
    // Inyecta el servicio desde el TestBed para poder probarlo
    service = TestBed.inject(UserService);
  });

  // Caso de prueba: verifica que el servicio se haya creado correctamente
  it('should be created', () => {
    expect(service).toBeTruthy(); // Espera que la instancia del servicio no sea null ni undefined
  });
});