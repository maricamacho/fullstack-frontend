//importamos componentes y modulos necesarios
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PoliticianService } from '../services/politician.service';
import {Politician} from '../models/politician';

//Definimos metadatos del component, el decorador
@Component({
    selector: 'politician-update',
    templateUrl: '../views/politician.new.html',
    providers: [PoliticianService]
})

//Clase exportable para actualizar el detalle de un político
export class PoliticianUpdateComponent implements OnInit{
    //Variables de nuestro componente
    //Título
    public title: string;
    //Objeto del modelo Politician
    public politician: Politician;
    //Variable loading para el efecto cargando
    public loading;
    //Status para almacenar el estado de la respuesta
    public status;
    //Mensaje de error de la respuesta
    public msg_error;
    
    //Constructor, donde cargamos configuracion del router y nuestro servicio
    constructor(
	private _politicianService: PoliticianService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        //Inicializamos el título
        this.title= 'Actualizar registro';    
    }
    
    //Función ngOnInit 
    ngOnInit(){
        //Inicializamos el objeto de nuestro modelo Politician
        this.politician = new Politician(1, '', '', '', '','', '','', '', null, null, null, null, null, null, null,'');
        //Llamamos a la funcion para obtener los datos del político 
        this.getPolitician();
    }
	
    //Método para obtener los detalle de un político
    getPolitician() {
        //Visualizamos efecto cargando
        this.loading='show';
        //Accedemos parametros de la url
        this._route.params.forEach((params: Params)=> {
            //Recogemos id de la peticion
            let id = params['id'];
            //Llamamos a la funcion del servicio get, pasándole el id
            this._politicianService.get(id).subscribe(
                //Callback response, obtenemos la respuesta 
                response => {
                    //Extraemos el estado de la respuesta
                    this.status = response.status;
                    //Ocultamos efecto cargando
                    this.loading='hide';
                    //Comprobamos estado de la respuesta
                    if(this.status != 'success') {
                        //En caso de error camptamos el mensaje que nos devuelve
                        this.status = 'error';
                        this.msg_error = response.code + ' - ' + response.msg;
                    }
                    else {
                        //Obtenemos los datos de la respuesta y lo almacenamos en nuestro objeto Politician para utilizarlo en la vista
                        this.politician = response.politician;
                    }
                },
                //Callback error, algo ha ido mal
                error=> {
                    //Mostrar por consola el error
                    console.log(<any>error);
                }
            );
        });
    }

    //Método onSubmit, donde realizaremos el envío de los datos captados	
    onSubmit() {
        //Visualizamos efecto cargando
        this.loading='show';
        //Accedemos parametros de la url
        this._route.params.forEach((params: Params)=> {
            //Recogemos id de la peticion
            let id = params['id'];
            //Llamamos a la funcion del servicio update, pasándole los datos recogidos
            this._politicianService.update(this.politician, id).subscribe(
                response => {
                    //Extraemos el estado de la respuesta
                    this.status = response.status;
                    //Ocultamos efecto cargando
                    this.loading='hide';
                    if(this.status != 'success') {
                        //En caso de error camptamos el mensaje que nos devuelve
                        this.status = 'error';
                        this.msg_error = response.code + ' - ' + response.msg;
                    }
                    else {
                        //Obtenemos los datos de la respuesta y lo almacenamos en nuestro objeto Politician
                        this.politician = response.politician;
                        //Redireccion al detalle del politico pasandole el id del político creado
                        this._router.navigate(['/politician', this.politician.id]);
                    }
                },
                //Callback error, algo ha ido mal
                error=> {
                    //Mostrar por consola el error
                    console.log(<any>error);
                }
            );
        });
    }
}

