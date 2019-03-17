import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

//Importamos variables fichero configuracion rutas
import { appRoutingProviders, routing } from './app.routing';


//Importamos nuestros componentes
import { PoliticiansComponent } from './components/politicians.component';
import { PoliticianNewComponent } from './components/politician.new.component';
import { PoliticianDetailComponent } from './components/politician.detail.component';
import { PoliticianUpdateComponent } from './components/politician.update.component';

//Añadimos nuestros componentes a NgModule
@NgModule({
  declarations: [
    AppComponent,
    PoliticiansComponent,
    PoliticianNewComponent,
    PoliticianDetailComponent,
    PoliticianUpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule
  ],
  providers: [
    appRoutingProviders
],
  bootstrap: [AppComponent]
})
export class AppModule { }
