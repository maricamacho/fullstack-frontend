import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import {GLOBAL} from './global';

// Servicio donde se definiran los métodos para realizar las peticiones ajax al backend 
@Injectable ()
export class PoliticianService{
    //Variable de la url a donde se realizaráb kas peticiones
    public url: string;
    
    //Inicializamos el patámentro URL con la URL de nuestro backend
    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }
    
    //Peticion de la lista completa de los politicos. Método GET
    getPoliticians(page=null) {
        //Cabeceras hhttp de la petición 
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        //Inicializamos la página
        if(page==null) {
             page=1;
        }
        //Realizamos la petición ajax y mapeamos la respuesta
       return this._http.get(this.url+'?page='+page, {headers:headers}).pipe(map(res => res.json())); 
    }
    
    //Petición actualizar político. Método PUT
    update(politician, id) {
        //Convertir objeto politician a string json para pasarlo como parámetro
        let json = JSON.stringify(politician);
        //Parametros a enviar
        let params = 'json='+json;
        //Cabeceras hhttp de la petición 
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        //Realizamos la petición ajax y mapeamos la respuesta
        return this._http.put(this.url+'/update/' +id, params, {headers:headers}).pipe(map(res => res.json()));
    }
    
    //Petición insertar político. Método POST
    create(politician) {
        //Convertir objeto politician a string json para pasarlo como parámetro
        let json = JSON.stringify(politician);
        //Parametros a enviar
        let params = 'json='+json;
        //Cabeceras hhttp de la petición 
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
        //Realizamos la petición ajax y mapeamos la respuesta
        return this._http.post(this.url+'/create', params, {headers:headers}).pipe(map(res => res.json()));
    }
    
    //Petición para obtener el politico. Método GET
    get(id) {
        //Cabeceras hhttp de la petición 
        let headers = new Headers({'Content-Type':'application/x-form-urlencoded'});
        //Realizamos la petición ajax y mapeamos la respuesta
        return this._http.get(this.url+'/detail/' +id, {headers:headers}).pipe(map(res => res.json()));;
    }
    
}
