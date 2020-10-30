import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found.component';



@NgModule({
  declarations: [NavbarComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent]
})
export class CoreModule { }
