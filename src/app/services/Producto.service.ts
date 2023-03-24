

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IProducto } from '../interfaces/IProducto';

@Injectable({
  providedIn: 'root'
})
/**
 *    Class name: ProductoService
 *    Class description: A class that is exported to be used in other files with different 
 *      methods of the backend via url
 *    Class date: 23-03-2023
 *    Developer: Johan Álvarez
 *    Modification:
 *        date + nameDeveloper + change description
 * */
export class ProductoService {
  private endPoint:string = environment.endPoint;
  private apiUrl:string = this.endPoint; 

  /**
     * Description:
     *      Method that runs when the component is loaded.
     * Args:
     *      @param {HttpClient} http: variable creates an instance of the HttpClient 
     *        service and assigns it to the http
     * Return:
     *      Doesn't apply
     * method date:
     *      22-03-2023
     * Developer:
     *      Johan Álvarez
     * Modification:
     *      date + nameDeveloper + change description
     * */
  constructor(private http:HttpClient) { }

  /**
     * Description:
     *      Method to list all products
     * Args:
     *      Doesn't apply
     * Return:
     *      @returns An Observable of type IProducto[]
     * method date:
     *      22-03-2023
     * Developer:
     *      Johan Álvarez
     * Modification:
     *      date + nameDeveloper + change description
     * */
  getList():Observable<IProducto[]>{
    return this.http.get<IProducto[]>(`${this.apiUrl}listarProductos`);
  }

  /**
     * Description:
     *      Method to create a product
     * Args:
     *      @param {IProducto} modelo - IProducto
     * Return:
     *      @returns An Observable of type IProducto
     * method date:
     *      22-03-2023
     * Developer:
     *      Johan Álvarez
     * Modification:
     *      date + nameDeveloper + change description
     * */
  add(modelo:IProducto):Observable<IProducto>{
    return this.http.post<IProducto>(`${this.apiUrl}crearProductos`,modelo);
  }

  /**
     * Description:
     *      Method to update a product
     * Args:
     *      @param {number} idProducto - The id of the product to be updated.
     *      @param {IProducto} modelo - IProducto
     * Return:
     *      @returns An Observable of type IProducto
     * method date:
     *      22-03-2023
     * Developer:
     *      Johan Álvarez
     * Modification:
     *      date + nameDeveloper + change description
     * */
  update(idProducto:number, modelo:IProducto):Observable<IProducto>{
    return this.http.put<IProducto>(`${this.apiUrl}editarProducto/${idProducto}`,modelo);
  }

  /**
     * Description:
     *      Method to update a product
     * Args:
     *      @param {number} idProducto - The id of the product to be deleted.
     * Return:
     *      @returns An Observable of type IProducto
     * method date:
     *      22-03-2023
     * Developer:
     *      Johan Álvarez
     * Modification:
     *      date + nameDeveloper + change description
     * */
  delete(idProducto:number):Observable<IProducto>{
    return this.http.delete<IProducto>(`${this.apiUrl}eliminarProducto/${idProducto}`);
  }
}
