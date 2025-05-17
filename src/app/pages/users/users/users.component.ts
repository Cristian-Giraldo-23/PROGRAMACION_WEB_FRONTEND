// Importación de módulos y componentes necesarios para el componente
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from 'app/shared/components/breadcrumb/breadcrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from 'app/services/users/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreateUserComponent } from 'app/pages/modal-create-user/modal-create-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalEditUsersComponent } from 'app/pages/modal-edit-users/modal-edit-users.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// Interfaz que define la estructura de un usuario
export interface User {
  name: string;
}

// Decorador que define el componente
@Component({
    selector: 'app-users',
    standalone: true,
    imports: [
      CommonModule,
      BreadcrumbComponent,
      MatFormFieldModule,
      MatSelectModule,
      MatOptionModule,
      MatDatepickerModule,
      MatInputModule,
      MatTooltipModule,
      ReactiveFormsModule,
      MatSnackBarModule,
      MatAutocompleteModule,
      MatIconModule,
      MatPaginatorModule,
      MatButtonModule,
      MatTableModule,
      MatProgressSpinnerModule
    ],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
  })

// Clase del componente
export class UsersComponent {

    // Columnas que se mostrarán en la tabla
    displayedColumns: string[] = [
      'name',
      'email',
      'role',
      'action'
    ];

    // Migas de pan (breadcrumbs) para navegación
    breadscrums = [
      {
        title: 'Gestión de usuarios',
        items: [],
        active: 'Datos básicos'
      },
    ];

    // Función para mejorar el rendimiento en ngFor con trackBy
    trackByFn(index: number, item: any): any {
      return item?.id || index;
    }

    breadcrumsDetails = [
        {
          title: '',
        },
      ];

    // Fuente de datos para la tabla
    dataSource = new MatTableDataSource<any>([]);

    // Acceso al paginador de Angular Material
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

    // Formulario para filtros de búsqueda
    userFormSearchFilter!: FormGroup;

    // Lista de usuarios
    usersList: any[] = [];

    // Controla el estado de carga
    isLoading = false;

    // Filtros por defecto
    userDefaultFilterSearch: any = {
      name: undefined,
      email: undefined,
    }

    // Constructor que inyecta dependencias
    constructor(
      private readonly _formBuilder: FormBuilder,
      private readonly userService: UserService,
      private readonly _snackBar: MatSnackBar,
      private readonly dialogModel: MatDialog
    ) { }

    // Método que se ejecuta al iniciar el componente
    ngOnInit(): void {
      this.createUserFormSearchFilter();
      this.getAllUserByAdministrator();
      this.handleUserFilterChange('name', 'name');
      this.handleUserFilterChange('email', 'email');
    }

    // Crea el formulario reactivo para búsqueda
    private createUserFormSearchFilter() {
      this.userFormSearchFilter = this._formBuilder.group({
        name: [''],
        email: ['']
      });
    }

    // Retorna el nombre del rol según el ID
    getRoleName(rol_id: number): string {
      switch (rol_id) {
        case 1:
          return 'Administrador';
        case 2:
          return 'Usuario';
        default:
          return 'Desconocido';
      }
    }

    // Escucha los cambios en los filtros y actualiza los resultados
    private handleUserFilterChange(controlName: string, filterKey: string) {
      this.userFormSearchFilter.controls[controlName].valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe((value: any) => {
        this.userDefaultFilterSearch[filterKey] = value;
        console.log(this.userDefaultFilterSearch);
        this.getAllUserByAdministrator({
          ...this.userDefaultFilterSearch,
          [filterKey]: value
        });
      });
    }

    // Obtiene todos los usuarios, puede incluir filtros
    getAllUserByAdministrator(filters?: any): void {
      this.isLoading = true;
      this.userService.getAllUsersByAdministrator(filters).subscribe({
        next: (response) => {
          this.usersList = response.users;
          this.dataSource.data = response.users;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }

    // Abre el modal para crear usuarios
    openModalCreateUser(): void {
      const dialogRef = this.dialogModel.open(ModalCreateUserComponent, {
        minWidth: '300px',
        maxWidth: '1000px',
        width: '840px',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getAllUserByAdministrator();
        }
      });
    }

    // Abre el modal para actualizar usuarios
    openModalUpdateUsers(userInformation: any): void {
      const dialogRef = this.dialogModel.open(ModalEditUsersComponent, {
        minWidth: '300px',
        maxWidth: '1000px',
        width: '840px',
        disableClose: true,
        data: { user: userInformation }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getAllUserByAdministrator();
        }
      });
    }

    // Elimina un usuario dado su ID
    deleteUser(userId: number): void {
      this.userService.deleteUser(userId).subscribe({
        next: (response) => {
          this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
          this.getAllUserByAdministrator();
        },
        error: (error) => {
          const errorMessage = error.error?.message || 'Error al eliminar el usuario';
          this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
        }
      });
    }

}