import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  form: FormGroup;
  roles = [];

  constructor(private formBuilder: FormBuilder,
    private db: FirebaseService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      departamento: ['', [Validators.required]],

    });

    this.getRoles();
  }




  getRoles(){
    this.db.getCollection('roles').subscribe(data => {
      this.roles = data.map(e => {
        return {
          id: e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'],          
          descripcion: e.payload.doc.data()['descripcion'],
          rango: e.payload.doc.data()['rango']           
        };
      });
    }, error => {
      console.log(error)
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get nombre() {
    return this.form.get('nombre');
  }

  get email() {
    return this.form.get('email');
 }

 
 get password() {
  return this.form.get('password');
}

get rol() {
  return this.form.get('rol');
}


get departamento() {
  return this.form.get('departamento');
}
}
