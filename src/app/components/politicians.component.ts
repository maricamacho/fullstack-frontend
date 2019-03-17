//importamos componentes y modulos necesarios
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PoliticianService } from '../services/politician.service';
import { Politician } from '../models/politician';
 
//Definimos metadatos del component, el decorador
@Component({
    selector: 'politicians',
    templateUrl: '../views/politicians.html',
    providers: [PoliticianService]
})

//Clase exportable para obtener todos los registros
export class PoliticiansComponent implements OnInit{
    //Variables de nuestro componente
    //Título
    public title: string;
    //Variable loading para el efecto cargando
    public loading;
    //Array de objetos de nuestro modelo Politician
    public politicians: Array<Politician>;
    //Variables de pagonacion
    //Páginas
    public pages;
    //Página anterior
    public pagePrev;
    //Página siguiente
    public pageNext;
    //Página actual
    public pageNow;
    
    //Constructor, donde cargamos configuracion del router y nuestro servicio
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _politicianService : PoliticianService
    ){
        //Inicializamos el título
        this.title= 'Resultados base de datos';
    
    }
    
    //Función ngOnInit 
    ngOnInit() {
        //Llamamos a la funcion para obtener la lista completa de políticos
        this.getAllPoliticians();
    }
    
    //Método para obtener la lista completa de políticos  
    getAllPoliticians() {
        //Visualizamos efecto cargando
        this.loading='show';
        //Accedemos parametros
        this._route.params.forEach((params: Params) => {
            //Obtenemos el parametro de la página a pintar
            let page = +params['page'];
            //Inicializamos página a 1
            if(!page) {
                page=1;
            }
            //Llamamos a la funcion del servicio get, pasándole la página
            this._politicianService.getPoliticians(page).subscribe(
                //Callback response, obtenemos la respuesta 
                response => {   
                    if(response.status == 'success'){
                        //Obtenemos los datos devueltos y los almacenamos en nuestro array
                        this.politicians = response.politicians;
                        //Ocultamos efecto cargando
                        this.loading='hide';
                        //Datos para paginación
                        //Total páginas
                        this.pages=[];
                        for(let i=1; i < response.total_pages; i++){
                            this.pages.push(i);
                        }
                        //Obtenemos página anterior
                        if(page>=2) {
                            this.pagePrev = (page - 1);
                        }
                        else {
                            this.pagePrev = page;
                        }
                        //Obtenemos página siguiente
                        if(page < response.total_pages) {
                            this.pageNext = (page + 1);
                        }
                        else {
                            this.pageNext = page;
                        }
                        //Obtenemos página actual
                        this.pageNow = page;
                    }
                },
                //Callback error, algo ha ido mal
                error => {
                    //Mostrar por consola el error
                    console.log(<any>error);
                }
            );
        });
    }

}