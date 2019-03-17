//Importamos componentes y modulos necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importamos nuestros componentes
import { PoliticiansComponent } from './components/politicians.component';
import { PoliticianNewComponent } from './components/politician.new.component';
import { PoliticianDetailComponent } from './components/politician.detail.component';
import { PoliticianUpdateComponent } from './components/politician.update.component';

//Configuración de rutas 
const appRoutes: Routes = [
    {path:'', component: PoliticiansComponent},
    {path:'index', component: PoliticiansComponent},
    {path:'index/:page', component: PoliticiansComponent},
    {path:'create', component: PoliticianNewComponent},
    {path : 'politician/:id', component: PoliticianDetailComponent},
    {path : 'update/:id', component: PoliticianUpdateComponent},
    {path:'**', component: PoliticiansComponent}
];

//Exportamos variables necesarias para cargar la configuración de nuestras rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);