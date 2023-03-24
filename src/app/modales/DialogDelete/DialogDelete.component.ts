import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IProducto } from 'src/app/interfaces/IProducto';

@Component({
  selector: 'app-DialogDelete',
  templateUrl: './DialogDelete.component.html',
  styleUrls: ['./DialogDelete.component.css']
})
/**
 *    Class name: DialogDeleteComponent
 *    Class description: A class that contain methods from the "ProductoService" 
 *        service. Implements the OnInit interface
 *    Class date: 23-03-2023
 *    Developer: Johan Álvarez
 *    Modification:
 *        date + nameDeveloper + change description
 * */
export class DialogDeleteComponent implements OnInit {

  /**
   * Description:
   *      The constructor function is used to initialize the component's properties
   *      and to inject the services that the component needs.
   * Args:
   *      @param dialogoReferencia - MatDialogRef<DialogDeleteComponent>
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
    private dialogoReferencia: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataProducto: IProducto
  ) { }

  ngOnInit() {
  }

  /**
   * The function above is called when the user clicks the "eliminar" button
   * in the dialog. It closes the dialog and passes the string "eliminar" to
   * the parent component.
   */
  confirmarEliminar(){
    if (this.dataProducto) {
      this.dialogoReferencia.close("eliminar"); 
    }
  }
}
