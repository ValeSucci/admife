import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { RestapiService } from '../services/restapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EncriptadorService } from '../services/encriptador.service';

@Component({
  selector: 'app-editar-usuario-admi',
  templateUrl: './editar-usuario-admi.component.html',
  styleUrls: ['./editar-usuario-admi.component.css']
})
export class EditarUsuarioAdmiComponent implements OnInit {

  
  public usuario: Usuario
  public lastUsername: string;
  public lastPassword: string;
  public lastNombre: string;
  public lastEstado: boolean;
  public lastFecha: Date;
  public pass1: string;
  public pass2: string;
  public my_data: any;
  constructor(
    public _service: RestapiService,
    public _route: ActivatedRoute,
    public _router: Router,
    public _encriptador: EncriptadorService
  ) {
    this.usuario = new Usuario("", "", "", 0, "", false, false, null, null);
    this.lastUsername = _route.snapshot.paramMap.get('username');
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this._service.getGlobal('/Usuario/get/' + this.lastUsername, '', '').subscribe(data => {
      this.my_data = data;
      this.lastNombre = this.my_data.u.nombre;
      this.lastPassword = this._encriptador.work(this.my_data.u2,false);
      this.usuario = this.my_data.u;
      this.usuario.password = this.lastPassword;
      console.log(this.usuario)
      console.log(this.lastPassword.toString())
    }, error => {
      console.log(error)
    })
  }

  altaOBaja(st: boolean){
    this.usuario.habilitado = st;
    console.log(this.usuario.habilitado)
    if(this.usuario.habilitado) {
      this.usuario.fecha_fin = null;
    } else {
      this.usuario.fecha_fin = new Date();
    }
  }

  onSubmit() {
    //console.log(this.pass1 + '...' + this.pass2)
    if (this.pass1 === this.pass2 && !(this.pass1 === null || (typeof this.pass1 === 'undefined' || typeof this.pass2 === 'undefined'))) {
      let pEnc = this._encriptador.work(this.pass1,true);
      this.usuario.password = pEnc;
    }
    //console.log(this.usuario)
    this._service.putGlobal(this.usuario, '/Usuario/updateAdmi/' + this.lastUsername, '').subscribe(data => {
      //console.log(data)
      this._router.navigate(['/ver-usuarios'])
    }), (err) => {
      console.log(err)
    }
    this.usuario = new Usuario("", "", "", 0, "", false, false, null, null);
  }

}
