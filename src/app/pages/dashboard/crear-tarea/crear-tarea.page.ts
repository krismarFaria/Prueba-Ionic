import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
})
export class CrearTareaPage implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fechaDeCreacion: ['', [Validators.required]],
      FechaDeFinalizacion: ['', [Validators.required]],
      estatus: ['', [Validators.required]],
      empleadoCreador: ['', [Validators.required]],
      empleadoAsignado: ['', [Validators.required]],
      
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get title() {
    return this.form.get('title');
  }

  get descripcion() {
    return this.form.get('descripcion');
 }

 get fechaDeCreacion() {
  return this.form.get('fechaDeCreacion');
}


get FechaDeFinalizacion() {
  return this.form.get('FechaDeFinalizacion');
}

get estatus() {
  return this.form.get('estatus');
}

get empleadoCreador() {
  return this.form.get('empleadoCreador');
}

get empleadoAsignado() {
  return this.form.get('empleadoAsignado');
}


}
