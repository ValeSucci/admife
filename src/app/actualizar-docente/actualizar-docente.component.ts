import { Component, OnInit } from '@angular/core';
import { Docente } from '../models/docente';
import { RestapiService } from '../services/restapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar-docente',
  templateUrl: './actualizar-docente.component.html',
  styleUrls: ['./actualizar-docente.component.css']
})
export class ActualizarDocenteComponent implements OnInit {
  private docente: Docente;
  private lastCodigo: number;
  private lastNombre: string;
  private lastDireccion: string;
  private lastTelefono: number;
  private lastCorreo: string;
  private my_data: any;
  constructor(private _service: RestapiService, private _route: ActivatedRoute) {
    this.docente = new Docente(0,"","",0,"");
    this.lastCodigo = parseInt(_route.snapshot.paramMap.get('codigo'));
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    this._service.getGlobal('/Docente/get/'+this.lastCodigo,'','').subscribe(data=>{
      this.my_data = data;
      this.lastNombre = this.my_data.nombre;
      this.lastDireccion = this.my_data.direccion;
      this.lastTelefono = this.my_data.telefono;
      this.lastCorreo = this.my_data.correo;
      this.docente = this.my_data;
    }, error=>{
      console.log(error)
    })
  }

  onSubmit(){
    this._service.putGlobal(this.docente,'/Docente/update/'+this.lastCodigo,'').subscribe(data => {
      console.log(this.docente)
    }), (err)=>{
      console.log(err)
    }
    this.docente = new Docente(0,"","",0,"")
  }

}