// Importación de clases necesarias para realizar peticiones HTTP y manejar parámetros
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Importación de la URL base desde un archivo de configuración
import { URL_SERVICIOS } from '@core/models/config';

// Importación de la clase Observable para manejar respuestas asíncronas
import { Observable } from 'rxjs';

// Decorador que permite que este servicio esté disponible en toda la aplicación
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // URL base para los servicios del backend
  urlBaseServices: string = URL_SERVICIOS;

  // Inyección del cliente HTTP para realizar peticiones
  constructor(private readonly http: HttpClient) {}

  /**
   * Crea un nuevo usuario enviando los datos al backend
   * @param userData Información del usuario a crear
   * @returns Observable con la respuesta de la API
   */
  createUser(userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/create`;
    return this.http.post<any>(endpoint, userData);
  }

  /**
   * Actualiza la información de un usuario específico
   * @param userId ID del usuario a actualizar
   * @param userData Nuevos datos del usuario
   * @returns Observable con la respuesta de la API
   */
  updateUser(userId: number, userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/update/${userId}`;
    return this.http.put<any>(endpoint, userData);
  }

  /**
   * Elimina un usuario por su ID
   * @param userId ID del usuario a eliminar
   * @returns Observable con la respuesta de la API
   */
  deleteUser(userId: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/delete/${userId}`;
    return this.http.delete<any>(endpoint);
  }

  /**
   * Obtiene todos los usuarios según los filtros proporcionados, filtrados por nombre y correo electrónico
   * @param filters Filtros opcionales (name y email)
   * @returns Observable con la lista de usuarios
   */
  getAllUsersByAdministrator(filters?: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users`;

    // Construcción de los parámetros de consulta
    const params = new HttpParams({ fromObject: {
      nombre: filters?.name || '', // Si no se pasa filtro, se usa cadena vacía
      email: filters?.email || ''
    }});

    return this.http.get<any>(endpoint, { params });
  }

  /**
   * Obtiene todos los usuarios con rol de administrador (rol_id = 1)
   * @returns Observable con la lista de administradores
   */
  getAllAdministrator(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/1`;
    return this.http.get<any>(endpoint);
  }

  /**
   * Obtiene todos los usuarios normales (rol_id = 2)
   * @returns Observable con la lista de usuarios
   */
  getAllUsers(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/2`;
    return this.http.get<any>(endpoint);
  }
}