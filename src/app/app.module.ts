import { PacotesModule } from './views/pacotes/pacotes.module';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { PacotesDeViagemComponent } from './views/pacotes/pacotes-de-viagem/pacotes-de-viagem.component';

const routes: Routes = [
  { path: '', redirectTo: '/pacotes-de-viagem', pathMatch: 'full' },
  { path: 'pacotes-de-viagem', component: PacotesDeViagemComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found'}
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PacotesModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
