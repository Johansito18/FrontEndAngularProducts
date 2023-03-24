import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as moment from 'moment'; 

import { ProductoService } from './../../services/Producto.service';
import { IProducto } from './../../interfaces/IProducto';

@Component({
  selector: 'app-DialogAddEdit',
  templateUrl: './DialogAddEdit.component.html',
  styleUrls: ['./DialogAddEdit.component.css']
})
/**
 *    Class name: DialogAddEditComponent
 *    Class description: A class that contain methods from the "ProductoService" 
 *        service. Implements the OnInit interface
 *    Class date: 23-03-2023
 *    Developer: Johan Álvarez
 *    Modification:
 *        date + nameDeveloper + change description
 * */
export class DialogAddEditComponent implements OnInit {

  formProducto: FormGroup;
  tituloAccion: string = "Nuevo";
  botonAccion: string = "Guardar";
  listaProductos: IProducto[] = [];

  /**
   * Description:
   *      The constructor function is used to initialize the component's properties
   *      and to inject the services that the component needs.
   * Args:
   *      @param dialogoReferencia - MatDialogRef<DialogAddEditComponent>
   *      @param {FormBuilder} fb - FormBuilder
   *      @param {MatSnackBar} snackBar - This is the service that will be used to
   *          display the snackbar.
   *      @param {ProductoService} productoService - This is the service that will
   *          be used to make the HTTP requests.
   *      @param {IProducto} dataProducto - IProducto
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
    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private productoService: ProductoService,
    @Inject(MAT_DIALOG_DATA) public dataProducto: IProducto
  ){

    this.formProducto = this.fb.group({
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      fecha:['',Validators.required]
    }) 

    this.productoService.getList().subscribe({
      next:(dataResponse)=>{
        this.listaProductos = dataResponse;
      },
      error:(e)=>{}
    })  
  }

  /**
     * Description:
     *      Method that uses the snackBar to display a message to the user
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
     *      The method is called when the user clicks the "Save" button in the dialog.
     *      It checks if the dialog was opened in "add" or "edit" mode, and then calls
     *      the appropriate service method.
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
  //addEditProducto
  addEditProducto(){
    
    console.log(this.formProducto.value);

    const modelo: IProducto={
      idProducto: 0,
      nombre: this.formProducto.value.nombre,
      descripcion: this.formProducto.value.descripcion,
      fecha: this.formProducto.value.fecha,
    }

    if (this.dataProducto == null) {
      this.productoService.add(modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Producto creado","listo");
          this.dialogoReferencia.close("creado");
        },error:(e)=>{
          this.mostrarAlerta("No se pudo crear","error");
        }
      });  
    }else{
      this.productoService.update(this.dataProducto.idProducto,modelo).subscribe({
        next:(data)=>{
          console.log(this.dataProducto.idProducto);
          this.mostrarAlerta("Producto editado","listo");
          this.dialogoReferencia.close("editado");
        },error:(e)=>{
          this.mostrarAlerta("No se pudo editar","error");
        }
      });
    }
  }

  /**
    *  Method to assign the values of the dataProducto in the values of the
    *  formProducto.
    * */
  //ngOnInit
  ngOnInit() :void {
    if (this.dataProducto) {
      this.formProducto.patchValue({
        idProducto: this.dataProducto.idProducto,
        nombre: this.dataProducto.nombre,
        descripcion: this.dataProducto.descripcion,
        fecha: this.dataProducto.fecha
      });
      
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }
}
