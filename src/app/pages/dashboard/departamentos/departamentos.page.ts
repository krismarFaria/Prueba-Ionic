import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from 'src/app/models/departamento.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.page.html',
  styleUrls: ['./departamentos.page.scss'],
})
export class DepartamentosPage implements OnInit {

  form: FormGroup;
  departamentos = [];
 
  constructor(private formBuilder: FormBuilder,
    private db: FirebaseService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],    
    });

    this.getDepartamentos();
  }

 
  cancelUpdate(){
    this.form.reset();
  }



  selectToUpdate(departamento : Departamento ){
    this.id.setValue(departamento.id)
    this.nombre.setValue(departamento.nombre);
    this.descripcion.setValue(departamento.descripcion);
  }


  getDepartamentos(){
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

  submit(){

    if(this.id.value){
      this.db.UpdateCollection('departamentos', this.form.value).then(res =>{      
        this.db.Toast('Actualizacion exitosa')  
        this.form.reset();   
      }, error => {
        this.db.Toast(error.message)
      })
    }else{

      this.db.addToCollection('departamentos', this.form.value).then(res =>{       
        this.db.Toast('Departamento creado con exito')   
        this.form.reset();   
      }, error => {
        this.db.Toast(error.message)
      })
    }
   
  }


  deleteDepartamento(id: string){
    this.db.deleteFromCollection('departamentos', id).then(res =>{   
      this.db.Toast('Eliminado con exito')         
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


}
