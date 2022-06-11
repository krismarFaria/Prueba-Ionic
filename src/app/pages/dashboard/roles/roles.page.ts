import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/models/role.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {

  form: FormGroup;
  roles = [];
 
  constructor(private formBuilder: FormBuilder,
    private db: FirebaseService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      rango: ['', [Validators.required]],     
    });

    this.getRoles();
  }


  cancelUpdate(){
    this.form.reset();
  }

  selectToUpdate(role: Role){
    this.id.setValue(role.id)
    this.nombre.setValue(role.nombre);
    this.descripcion.setValue(role.descripcion);
    this.rango.setValue(role.rango);
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

  submit(){

    if(this.id.value){
      this.db.UpdateCollection('roles', this.form.value).then(res =>{      
        this.db.Toast('Actualizacion exitosa')  
        this.form.reset();   
      }, error => {
        this.db.Toast(error.message)
      })
    }else{

      this.db.addToCollection('roles', this.form.value).then(res =>{       
        this.db.Toast('Rol creado con exito')   
        this.form.reset();   
      }, error => {
        this.db.Toast(error.message)
      })
    }
   
  }


  deleteRole(id: string){
    this.db.deleteFromCollection('roles', id).then(res =>{   
      this.db.Toast('Eliminacion exitosa')         
    }, error => {
      this.db.Toast(error.message)
    })
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering

  get id() {
    return this.form.get('id');
  }
  get nombre() {
    return this.form.get('nombre');
  }

  get descripcion() {
    return this.form.get('descripcion');
 }

get rango() {
  return this.form.get('rango');
}


}
