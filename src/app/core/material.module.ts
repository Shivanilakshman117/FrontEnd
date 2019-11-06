import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,MatCheckboxModule,MatDatepickerModule,MatNativeDateModule, 
 MatSelectModule,MatListModule,
 MatRadioModule
} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  imports: [
  CommonModule, 
  MatToolbarModule,
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatSelectModule,
  MatSidenavModule,
  MatNativeDateModule,
  MatRadioModule,
  MatListModule
  ],
  exports: [
  CommonModule,
   MatToolbarModule, 
   MatButtonModule, 
   MatCardModule, 
   MatInputModule, 
   MatDialogModule, 
   MatDatepickerModule,
   MatTableModule, 
   MatMenuModule,
   MatIconModule,
   MatCheckboxModule,
   MatProgressSpinnerModule,
   MatSelectModule,
   MatNativeDateModule,
   MatSidenavModule,
   MatRadioModule,
   MatListModule
   ],
})
export class CustomMaterialModule { }