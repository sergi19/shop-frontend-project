import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { DragDropFileDirective } from './directives/drag-drop-file.directive';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    DragDropFileDirective,
    FooterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    CommonModule,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    RouterModule,
    CommonModule,
    MaterialModule,
    DragDropFileDirective
  ]
})
export class SharedModule { }
