import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/services/users/users.service';

@Component({
  selector: 'app-modal-edit-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule
  ],
  templateUrl: './modal-edit-users.component.html',
  styleUrls: ['./modal-edit-users.component.scss']
})
export class ModalEditUsersComponent {
  // Formulario reactivo para editar usuario
  formUpdateUsers!: FormGroup;
  // Lista de administradores para mostrar en el select
  administratorsValues: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos recibidos al abrir el modal (usualmente el usuario a editar)
    private readonly _formBuilder: FormBuilder, // Constructor para formularios reactivos
    private readonly _snackBar: MatSnackBar, // Servicio para mostrar mensajes emergentes (snackbars)
    private readonly _userService: UserService, // Servicio para llamar a la API relacionada a usuarios
    private readonly dialogRef: MatDialogRef<ModalEditUsersComponent> // Referencia para cerrar el modal
  ) {
    this.updateFormUsers();  // Inicializa el formulario vacío
    this.getAllAdministrator(); // Obtiene la lista de administradores
  }

  // Se ejecuta al inicializar el componente
  ngOnInit() {
    if (this.data?.user) { // Si hay datos de usuario (para editar)
      this.loadUserData(this.data.user); // Carga los datos del usuario en el formulario
    }
  }

  // Crea el formulario reactivo con validaciones para cada campo
  updateFormUsers() {
    this.formUpdateUsers = this._formBuilder.group({
      nombre: ['', Validators.required], // Nombre obligatorio
      email: ['', [Validators.required, Validators.email]], // Email obligatorio y formato válido
      rol_id: ['', Validators.required], // Rol obligatorio
      administrador_id: ['', Validators.required] // Administrador obligatorio
    });
  }
  
  // Llena el formulario con la información del usuario que se quiere editar
  loadUserData(user: any) {
    this.formUpdateUsers.patchValue({ // Rellena los controles con valores
      nombre: user.nombre,
      email: user.email,
      rol_id: String(user.rol_id), // Convierte rol_id a string (para el select)
      administrador_id: user.administrador_id
    });
  }

  // Consulta para obtener todos los administradores desde el servicio
  getAllAdministrator() {
    this._userService.getAllAdministrator().subscribe({
      next: (res) => {
        this.administratorsValues = res.users; // Guarda la lista para usarla en el select
      },
      error: (err) => {
        console.error(err); // Log en caso de error
      }
    });
  }
  
  // Método que se ejecuta para enviar la actualización del usuario
  updateUsers() {
    if (this.formUpdateUsers.valid) { // Verifica que el formulario esté válido
      const userData = this.formUpdateUsers.value; // Obtiene los datos del formulario
      const userId = this.data?.user?.id; // Obtiene el id del usuario que se está editando
      
      // Llama al servicio para actualizar usuario, enviando id y datos nuevos
      this._userService.updateUser(userId, userData).subscribe({
        next: (response) => {
          // Si la actualización es exitosa, muestra mensaje y cierra modal con resultado true
          this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          // En caso de error, muestra mensaje personalizado o genérico
          const errorMessage = error.error?.result || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
          this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
        }
      });
    }
  }
}