import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { OpcionesTareaComponent } from 'src/app/components/opciones-tarea/opciones-tarea.component';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-tareas-de-equipo',
  templateUrl: './tareas-de-equipo.page.html',
  styleUrls: ['./tareas-de-equipo.page.scss'],
})
export class TareasDeEquipoPage implements OnInit {
  user;
  tareas = [];
  
  constructor(private db: FirebaseService,
    private popoverController: PopoverController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.getTareas();
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));    
  }

  
  getTareas(){
    this.db.getCollection('tareas').subscribe(data => {
      this.tareas = data.map(e => {
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.data()['title'],          
          descripcion: e.payload.doc.data()['descripcion'],   
          fechaDeCreacion:e.payload.doc.data()['fechaDeCreacion'],
          fechaDeFinalizacion:e.payload.doc.data()['fechaDeFinalizacion'],
          estatus:e.payload.doc.data()['estatus'],
          empleadoCreador:e.payload.doc.data()['empleadoCreador'],
          empleado:e.payload.doc.data()['empleado'],     
        };
      });
    }, error => {
      console.log(error)
    });
  }


  async changeEstatus(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cambiar Estatus',
      inputs: [
        {
          name: 'pendiente',
          type: 'radio',
          label: 'Pendiente',
          value: 'Pendiente',         
        },
        {
          name: 'proceso',
          type: 'radio',
          label: 'En proceso',
          value: 'En proceso',         
        },
        {
          name: 'realizado',
          type: 'radio',
          label: 'Realizado',
          value: 'Realizado',         
        },        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (res) => {
            let estatus = {id: id, estatus: res}           
            
            this.db.UpdateCollection('tareas', estatus).then(res => {
              this.db.Toast('Actualizacion exitosa')             
            }, error => {
              this.db.Toast(error.message)
            })
          }
        }
      ]
    });

    await alert.present();
  }
  

  async opcionesTarea(ev: any, tarea) {
    const popover = await this.popoverController.create({
      component: OpcionesTareaComponent,
      event: ev,
      componentProps: { tarea: tarea }
    });

    await popover.present();
  }















  
}
