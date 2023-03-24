import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { ProductoService } from './services/Producto.service';
import { IProducto } from './interfaces/IProducto';

import {MatDialog} from '@angular/material/dialog';
import { DialogAddEditComponent } from './modales/DialogAddEdit/DialogAddEdit.component';
import { DialogDeleteComponent } from './modales/DialogDelete/DialogDelete.component';

import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 *    Class name: AppComponent
 *    Class description: A class that contain methods from the "ProductoService"
 *        service. Implements the AfterViewInit and OnInit interfaces.
 *    Class date: 23-03-2023
 *    Developer: Johan Álvarez
 *    Modification:
 *        date + nameDeveloper + change description
 * */
export class AppComponent implements AfterViewInit, OnInit  {
  displayedColumns: string[] = ["idProducto","nombre", "descripcion", "fecha", "acciones"];
  dataSource = new MatTableDataSource<IProducto>();

  /**
     * Description:
     *      The constructor function is a special function that is called when a new instance of the class is
     *          created.
     * Args:
     *      @param {ProductoService} productoService - This is the service that
     *          we created earlier.
     *      @param {MatDialog} dialog - MatDialog - This is the service that allows
     *          us to open a dialog.
     *      @param {MatSnackBar} snackBar - MatSnackBar
     * Return:
     *      Doesn't apply
     * method date:
     *      22-03-2023
     * Developer:
     *      Johan Álvarez
     * Modification:
     *      date + nameDeveloper + change description
     * */
    //Constructor
  constructor(
    private productoService:ProductoService, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ){

    
  }

  /**
   * Method that calls this.mostrarProductos() when the project is running.
   */
  //ngOnInit
  ngOnInit(){
    this.mostrarProductos();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Method that set the paginator of the data source.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Description:
   *      Method that takes an event as an argument, gets the value of the input field,
   *      and sets the dataSource's filter property to the value of the input field.
   * Args:
   *      @param {Event} event - Event - The event that triggered the function.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
     * Description:
     *      Method that calls the getList() method of the productoService service.
     * Args:
     *      Doesn't apply
     * Return:
     *      Doesn't apply
     * method date:
     *      22-03-2023
     * Developer:
     *      Johan Álvarez
     * Modification:
     *      date + nameDeveloper + change description
     * */
  //MostrarProductos
  mostrarProductos(){
    this.productoService.getList().subscribe({
      next:(dataResponse) => {
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },
      error:(e)=>{console.log(e);}
    });
  }

  /**
     * Description:
     *      Method that calls opens a dialog box, and after it's closed, it subscribes
     *      to the result of the dialog box. if the result is "creado" then the 
     *      mostrarProductos() is called.
     * Args:
     *      Doesn't apply
     * Return:
     *      Doesn't apply
     * method date:
     *      22-03-2023
     * Developer:
     *      Johan Álvarez
     * Modification:
     *      date + nameDeveloper + change description
     * */
  //dialogoNuevoEmpleado
  dialogoNuevoEmpleado() {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe(resultado =>{
      if (resultado === "creado") {
        this.mostrarProductos();
      }
    });
  }

  /**
     * Description:
     *      Method that calls opens a dialog box, and after it's closed, it subscribes
     *      to the result of the dialog box. if the result is "editado" then the 
     *      mostrarProductos() is called.
     * Args:
     *      @Param dataProducto: IProducto
     * Return:
     *      Doesn't apply
     * method date:
     *      22-03-2023
     * Developer:
     *      Johan Álvarez
     * Modification:
     *      date + nameDeveloper + change description
     * */
  //dialogoNuevoEmpleado
  dialogoEditarProducto(dataProducto: IProducto) {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px",
      data: dataProducto

    }).afterClosed().subscribe(resultado =>{
      if (resultado === "editado") {
        this.mostrarProductos();
      }
    });
  }

  /**
     * Description:
     *      Method that uses the snackBar to display a message to the user.
     * Args:
     *      @param {string} msg - The message to be displayed.
     *      @param {string} accion - The text that will be displayed in the action
     *        button.
     * Return:
     *      Doesn't apply
     * method date:
     *      22-03-2023
     * Developer:
     *      Johan Álvarez
     * Modification:
     *      date + nameDeveloper + change description
     * */
  //mostrarAlerta
  mostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  /**
     * Description:
     *      Method that calls opens a dialog box, and after it's closed, it subscribes
     *      to the result of the dialog box. if the result is "eliminar" then the 
     *      mostrarProductos() is called.
     * Args:
     *      @Param dataProducto: IProducto
     * Return:
     *      Doesn't apply
     * method date:
     *      22-03-2023
     * Developer:
     *      Johan Álvarez
     * Modification:
     *      date + nameDeveloper + change description
     * */
  //dialogoEliminarProducto
  dialogoEliminarProducto(dataProducto:IProducto){
    this.dialog.open(DialogDeleteComponent,{
      disableClose:true,
      data: dataProducto
    }).afterClosed().subscribe(resultado =>{
      if (resultado === "eliminar") {
        this.productoService.delete(dataProducto.idProducto).subscribe({
          next:()=>{
            this.mostrarAlerta("Producto eliminado","listo")
            this.mostrarProductos();
          }
        })
      }
    });
  }
}

