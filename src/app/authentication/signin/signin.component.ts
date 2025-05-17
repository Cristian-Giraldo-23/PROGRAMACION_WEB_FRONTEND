// Importa los decoradores y clases necesarias de Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Importa herramientas de formularios reactivos y validadores
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importa el servicio de autenticación
import { AuthService } from '@core';

// Importa módulos de Angular Material para el diseño del formulario
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

// Importa SweetAlert2 para mostrar alertas estilizadas
import Swal from 'sweetalert2';

// Define el componente con su selector, plantilla, estilos y módulos importados
@Component({
  selector: 'app-signin', // Nombre del componente en HTML
  templateUrl: './signin.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./signin.component.scss'], // Estilos asociados al componente
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  standalone: true, // Especifica que el componente es independiente (no requiere módulo)
})
export class SigninComponent implements OnInit {

  // Definición del formulario reactivo
  authForm!: UntypedFormGroup;

  // Variables de control de estado del formulario
  submitted = false;
  loading = false;
  returnUrl!: string;
  error = '';
  hide = true; // Para ocultar o mostrar la contraseña en el input

  // Variables para capturar el email y la contraseña manualmente (aunque no se usan directamente)
  email = '';
  password = '';

  // Inyección de dependencias: FormBuilder, Router y AuthService
  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) { }

  // Método de ciclo de vida: se ejecuta al iniciar el componente
  ngOnInit() {
    // Inicializa el formulario con los campos username y password, ambos obligatorios
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // Accesor para acceder fácilmente a los controles del formulario
  get f() {
    return this.authForm.controls;
  }

  // Método que se ejecuta cuando se envía el formulario
  onSubmit() {
    this.submitted = true; // Marca el formulario como enviado
    this.error = ''; // Limpia errores anteriores

    // Si el formulario es inválido, muestra una alerta de error y detiene el proceso
    if (this.authForm.invalid) {
      Swal.fire('Error', 'Usuario y contraseña no válidos.', 'error');
      return;
    }

    // Llama al servicio de autenticación pasando los valores del formulario
    this.authService
      .login(this.authForm.get('username')?.value, this.authForm.get('password')?.value)
      .subscribe({
        // Si la autenticación es exitosa
        next: (res) => {
          if (res?.token) {
            // Guarda el token en el sessionStorage
            sessionStorage.setItem('accessToken', res.token);

            // Imprime el token en consola (para depuración)
            console.log('Token recibido:', res.token);

            // Informa al AuthService que se ha recibido el token
            this.authService.setToken(res.token);

            // Muestra mensaje de éxito y redirige al dashboard
            Swal.fire({
              title: 'Inicio de sesión exitoso',
              text: 'Redirigiendo al dashboard...',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              this.router.navigate(['/dashboard/main']); // Redirección
            });
          } else {
            // Si no hay token, muestra error de credenciales
            Swal.fire('Error', 'Credenciales incorrectas.', 'error');
          }
        },
        // Si ocurre un error en la solicitud
        error: (error) => {
          this.submitted = false;
          this.loading = false;
          Swal.fire('Error en el inicio de sesión', error.error?.message || 'Error desconocido', 'error');
        }
      });
  }
}