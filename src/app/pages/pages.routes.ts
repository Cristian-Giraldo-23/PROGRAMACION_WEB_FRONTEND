// Importación del tipo Route desde Angular Router
import { Route } from '@angular/router';

// Importación de los componentes que se utilizarán en las rutas
import { UsersComponent } from './users/users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsDetailComponent } from './projects-detail/projects-detail.component';

// Importación del guard que restringe el acceso a ciertas rutas
import { AdminGuard } from '@core/guard/admin.guard';

// Definición de las rutas del módulo
export const PAGES_ROUTE: Route[] = [
  {
    // Ruta para la gestión de usuarios
    path: 'users',
    component: UsersComponent,
    
    // Protección de ruta: solo accesible si AdminGuard lo permite (por ejemplo, si el usuario es administrador)
    canActivate: [AdminGuard]
  },
  {
    // Ruta para ver la lista de proyectos
    path: 'projects',
    component: ProjectsComponent
  },
  {
    // Ruta para ver el detalle de un proyecto, se pasa el ID como parámetro de ruta
    path: 'projects/detail/:id',
    component: ProjectsDetailComponent
  }
];