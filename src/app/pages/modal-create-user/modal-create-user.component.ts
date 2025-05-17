import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from '../../services/users/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-create-user',
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
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-create-user.component.html',
  styleUrls: ['./modal-create-user.component.scss']
})
export class ModalCreateUserComponent implements OnInit {
  // FormGroup que contiene los controles del formulario
  formCreateUser!: FormGroup;

  // Lista de administradores para mostrar en el select
  administratorValues: any[] = [];

  // Controla si se muestra o no el campo de administrador
  showFieldAdministrator: boolean = false;

  constructor(
    // Inyecta los datos que se pasan al modal
    @Inject(MAT_DIALOG_DATA) public data: any,
    // Servicio para construir formularios reactivos
    private readonly _formBuilder: FormBuilder,
    // Servicio para llamar a las APIs de usuario
    private readonly _userService: UserService,
    // Referencia para controlar el diálogo (cerrarlo, etc)
    private readonly dialogRef: MatDialogRef<ModalCreateUserComponent>,
    // Servicio para mostrar mensajes tipo snack bar
    private readonly _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario con sus controles
    this.createFormUsers();

    // Carga la lista de administradores para el select
    this.getAllAdministrator();

    // Se suscribe a los cambios del campo confirmPassword para validar que coincida con password
    this.formCreateUser.controls['confirmPassword'].valueChanges.pipe(
      debounceTime(1000),        // espera 1s después de escribir para validar
      distinctUntilChanged()     // solo se dispara si cambia el valor
    ).subscribe((value) => {
      this.validatePassword(value);
    });
  }

  // Crea el formulario con sus controles inicializados
  createFormUsers(): void {
    this.formCreateUser = this._formBuilder.group({
      nombre: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
      rol_id: [''],
      administrador_id: ['']
    });
  }

  // Valida si la confirmación de contraseña coincide con la contraseña
  public validatePassword(confirmPassword: string): void {
    const password = this.formCreateUser.get('password')?.value;
    if (password !== confirmPassword) {
      // Si no coinciden, marca error en confirmPassword
      this.formCreateUser.get('confirmPassword')?.setErrors({ invalid: true });
    } else {
      // Si coinciden, elimina el error
      this.formCreateUser.get('confirmPassword')?.setErrors(null);
    }
  }

  // Muestra el campo para seleccionar administrador y marca el campo como obligatorio
  public showAdministratorField(): void {
    this.showFieldAdministrator = true;
    this.formCreateUser.get('administrador_id')?.setValidators([Validators.required]);
    this.formCreateUser.get('administrador_id')?.updateValueAndValidity();
  }

  // Oculta el campo administrador y remueve la validación obligatoria
  public hideAdministratorField(): void {
    this.showFieldAdministrator = false;
    this.formCreateUser.get('administrador_id')?.clearValidators();
    this.formCreateUser.get('administrador_id')?.updateValueAndValidity();
  }

  // Obtiene la lista de administradores desde el servicio y asigna a la variable
  getAllAdministrator(): void {
    this._userService.getAllAdministrator().subscribe({
      next: (res) => {
        this.administratorValues = res.users;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Cuando cambia el rol en el formulario, se decide mostrar o no el campo administrador
  onChangeRole(event: any): void {
    if (event.value === '1') {
      // Si es Administrador, no mostrar campo administrador
      this.hideAdministratorField();
    } else {
      // Si es otro rol, mostrar campo administrador
      this.showAdministratorField();
    }
  }

  // Acción al enviar el formulario para crear usuario
  onSubmit(): void {
    if (this.formCreateUser.invalid) {
      // Si formulario inválido, mostrar alerta
      Swal.fire('Error', 'Por favor completa todos los campos', 'error');
      return;
    }

    // Recopila los datos del formulario
    const userDataInformation = {
      nombre: this.formCreateUser.get('nombre')?.value,
      email: this.formCreateUser.get('email')?.value,
      password: this.formCreateUser.get('password')?.value,
      rol_id: Number(this.formCreateUser.get('rol_id')?.value),
      administrador_id: this.formCreateUser.get('administrador_id')?.value
    };

    // Llama al servicio para crear usuario enviando los datos
    this._userService.createUser(userDataInformation).subscribe({
      next: (response) => {
        // Muestra mensaje de éxito con snackBar
        this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
        // Limpia el formulario
        this.formCreateUser.reset();
        // Cierra el modal indicando éxito (true)
        this.dialogRef.close(true);
      },
      error: (error) => {
        // En caso de error muestra mensaje con snackBar
        const errorMessage = error.error?.result || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
        this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }

  // trackBy para optimizar el *ngFor por índice
  trackByIndex(index: number, item: any): number {
    return index;
  }
}