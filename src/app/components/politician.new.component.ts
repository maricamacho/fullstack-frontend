//importamos componentes y modulos necesarios
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PoliticianService } from '../services/politician.service';
import { Politician } from '../models/politician';

//Definimos metadatos del component, el decorador
@Component({
    selector: 'politician-new',
    templateUrl: '../views/politician.new.html',
    providers: [PoliticianService]
})

//Clase exportable para crear el detalle de un político
export class PoliticianNewComponent implements OnInit{
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
        private _route: ActivatedRoute,
        private _router: Router,
        private _politicianService : PoliticianService
    ){
        //Inicializamos el título
        this.title= 'Añadir político';
    
    }
    
    //Función ngOnInit 
    ngOnInit(){
        //Inicializamos el objeto de nuestro modelo Politician
        this.politician = new Politician(null, '', '', '', '','', '','', '', null, null, null, null, null, null, null,'');
    }
    
    //Método onSubmit, donde realizaremos el envío de los datos captados
    onSubmit(){
        //Visualizamos efecto cargando
        this.loading='show';
        //Accedemos parametros
        this._route.params.forEach((params: Params)=> {
            //Llamamos a la funcion del servicio get, pasándole los datos recogidos
            this._politicianService.create(this.politician).subscribe(
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
                        //Obtenemos los datos de la respuesta y lo almacenamos en nuestro objeto Politician
                        this.politician = response.politician;
                        //Redireccion al detalle del politico pasandole el id del político creado
                        this._router.navigate(['/politician', this.politician.id]);
                    }
                },
                //Callback error, algo ha ido mal
                error=> {
                    console.log(<any>error);
                }
            );
        });
    }
}

