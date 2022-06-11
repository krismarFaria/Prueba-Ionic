import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Tarea } from 'src/app/models/tarea.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-form-tarea',
  templateUrl: './form-tarea.component.html',
  styleUrls: ['./form-tarea.component.scss'],
})
export class FormTareaComponent implements OnInit {

  form: FormGroup
  @Input() tarea: Tarea
  empleados = [];
  user = JSON.parse(localStorage.getItem('user'));
  constructor(
    private formBuilder: FormBuilder,
    private db: FirebaseService,
    private modalController: ModalController
    ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fechaDeCreacion: ['', [Validators.required]],
      fechaDeFinalizacion: ['', [Validators.required]],
      estatus: ['', [Validators.required]],
      empleadoCreador: [''],
      empleado: ['', [Validators.required]]
    });

    this.user = JSON.parse(localStorage.getItem('user'));
    this.empleadoCreador.setValue({ nombre: this.user.nombre, id: this.user.id })

    if (this.tarea) {
      this.id.setValue(this.tarea.id);
      this.title.setValue(this.tarea.title);
      this.descripcion.setValue(this.tarea.descripcion);
      this.fechaDeCreacion.setValue(this.tarea.fechaDeCreacion);
      this.fechaDeFinalizacion.setValue(this.tarea.fechaDeFinalizacion);
      this.estatus.setValue(this.tarea.estatus);
      this.empleado.setValue(this.tarea.empleado);
    }

    this.getEmpleados();
  }

  submit() {
    if (this.id.value) {
      let tareaEditada = {
        id: this.id.value,
        title: this.title.value,
        fechaDeCreacion: this.fechaDeCreacion.value,
        fechaDeFinalizacion: this.fechaDeFinalizacion.value,
        estatus: this.estatus.value
      }
      this.db.UpdateCollection('tareas', tareaEditada).then(res => {
        this.db.Toast('Actualizacion exitosa')
        this.modalController.dismiss();
        this.form.reset();
      }, error => {
        this.db.Toast(error.message)
      })
    } else {
      this.empleado.setValue({ nombre: this.empleado.value.nombre, id: this.empleado.value.id })

      this.db.addToCollection('tareas', this.form.value).then(res => {
        this.db.Toast('Tarea creada con exito')
        this.form.reset();
      }, error => {
        this.db.Toast(error.message)
      })
    }
  }


  getEmpleados() {

    if (this.user.role.rango == '1') {
      this.db.getCollection('empleados').subscribe(data => {
        this.empleados = data.map(e => {
          return {
            id: e.payload.doc.id,
            nombre: e.payload.doc.data()['nombre'],
          };
        });
      }, error => {
        console.log(error)
      });
    } else {
      this.db.getCollectionConditional('empleados', ref =>
        ref.where('role.rango', '==', '3')).subscribe(data => {
          this.empleados = data.map(e => {
            return {
              id: e.payload.doc.id,
              nombre: e.payload.doc.data()['nombre'],

            };
          });
        }, error => {
          console.log(error)
        });
    }

  }


  get id() {
    return this.form.get('id');
  }

  get title() {
    return this.form.get('title');
  }

  get descripcion() {
    return this.form.get('descripcion');
  }

  get fechaDeCreacion() {
    return this.form.get('fechaDeCreacion');
  }


  get fechaDeFinalizacion() {
    return this.form.get('fechaDeFinalizacion');
  }

  get estatus() {
    return this.form.get('estatus');
  }

  get empleadoCreador() {
    return this.form.get('empleadoCreador');
  }

  get empleado() {
    return this.form.get('empleado');
  }

}
