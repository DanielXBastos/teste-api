import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacotesDeViagemComponent } from './pacotes-de-viagem/pacotes-de-viagem.component';
import { CarouselModule } from 'primeng/carousel';



@NgModule({
  declarations: [PacotesDeViagemComponent],
  imports: [
    CommonModule,
    CarouselModule
  ]
})
export class PacotesModule { }
