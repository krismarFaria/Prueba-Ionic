import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from 'src/app/models/empleado.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  form: FormGroup;
  roles = [];
  departamentos = [];
  empleados = [];
  user;
  constructor(
    private formBuilder: FormBuilder,
    private db: FirebaseService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      departamento: ['', [Validators.required]],

    });

    if(firebase.apps.length < 2){
    firebase.initializeApp(environment.firebaseConfig, "Secondary");       
    }
        
    this.getRoles();
    this.getDepartamentos();
    this.getEmpleados();
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));    
  }

  cancelUpdate(){
    this.password.setValidators(Validators.required)
    this.form.reset();
  }


  async CreateUserAuth() {
 
    const loading = await this.db.loader().create();
    await loading.present();

    this.db.CreateUser(this.form.value).then(res => {
      this.id.setValue(res.user.uid);     
      this.CreateUserDB();     
      loading.dismiss();
    }, error => {
      this.db.Toast(error.message);
      loading.dismiss();
    });
  }


  async CreateUserDB() {
    const loading = await this.db.loader().create();
    await loading.present();

    this.db.addToCollectionById('empleados',this.form.value).then(res => {          
      this.db.Toast('Usuario creado con exito')    
      this.form.reset();
      loading.dismiss();
    }, error => {
      this.db.Toast(error.message);
      loading.dismiss();
    });
  }

  selectToUpdate(empleado: Empleado) {
    this.id.setValue(empleado.id)
    this.nombre.setValue(empleado.nombre);
    this.email.setValue(empleado.email);
    this.password.setValue(empleado.password);
    this.password.setValidators(null)
    this.role.setValue(empleado.role);
    this.departamento.setValue(empleado.departamento);
  }


  submit() {

    if (this.id.value) {
      this.db.UpdateCollection('empleados', this.form.value).then(res => {
        this.db.Toast('Actualizacion exitosa')
        this.password.setValidators(Validators.required)
        this.form.reset();
      }, error => {
        this.db.Toast(error.message)
      })
    } else {
        this.CreateUserAuth();     
    }

  }



  async AuthForDelete(user) {
    
    const loading = await this.db.loader().create();
    await loading.present();

    this.db.AuthForDelete(user.email, user.password).then(res => {
      loading.dismiss();
      this.DeleteUserAuth(user);
    }, error => {
      loading.dismiss();
      console.log(error);
    })
  }


  async DeleteUserAuth(user) {
    const loading = await this.db.loader().create();
    await loading.present();

    this.db.DeleteUserAuth().then(res => {

      this.DeleteUserDB(user);
      loading.dismiss();

    }, error => {

      loading.dismiss();
      console.log(error);
      
    })
  }

  async DeleteUserDB(user) {
    const loading = await this.db.loader().create();
    await loading.present();

    this.db.deleteFromCollection('empleados',user.id).then(res => {
      this.db.Toast('Eliminacion exitosa')
      
      loading.dismiss();

    }, error => {

      loading.dismiss();
      console.log(error);

    })
  }


  getEmpleados() {
    this.db.getCollection('empleados').subscribe(data => {
      this.empleados = data.map(e => {
        return {
          id: e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'],
          email: e.payload.doc.data()['email'],
          password: e.payload.doc.data()['password'],
          role: e.payload.doc.data()['role'],
          departamento: e.payload.doc.data()['departamento'],
        };
      });
    }, error => {
      console.log(error)
    });
  }


  getDepartamentos() {
    this.db.getCollection('departamentos').subscribe(data => {
      this.departamentos = data.map(e => {
        return {
          id: e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'],
          descripcion: e.payload.doc.data()['descripcion'],
        };
      });
    }, error => {
      console.log(error)
    });
  }


  getRoles() {
    this.db.getCollection('roles').subscribe(data => {
      this.roles = data.map(e => {
        return {
          id: e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'],
          descripcion: e.payload.doc.data()['descripcion'],
          rango: e.payload.doc.data()['rango'],
        };
      });
     
    }, error => {
      console.log(error)
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get id() {
    return this.form.get('id');
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get email() {
    return this.form.get('email');
  }


  get password() {
    return this.form.get('password');
  }

  get role() {
    return this.form.get('role');
  }


  get departamento() {
    return this.form.get('departamento');
  }
}
