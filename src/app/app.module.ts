import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Reactive forms 
import { ReactiveFormsModule } from '@angular/forms';

//Peticiones http
import { HttpClientModule } from '@angular/common/http'; 

//Tablas de material
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

//Controles de formularios de material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MomentDateModule } from '@angular/material-moment-adapter';

//Alertas
import { MatSnackBarModule } from '@angular/material/snack-bar';

//Iconos
import { MatIconModule } from '@angular/material/icon';

//Modales
import { MatDialogModule } from '@angular/material/dialog';

//Grillas
import {MatGridListModule } from '@angular/material/grid-list';
import { PruebaModule } from './modales/prueba.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PruebaModule,
    MatGridListModule, 
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule, 
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
