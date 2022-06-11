import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, PopoverController } from '@ionic/angular';
import { OpcionesTareaComponent } from 'src/app/components/opciones-tarea/opciones-tarea.component';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-mis-tareas',
  templateUrl: './mis-tareas.page.html',
  styleUrls: ['./mis-tareas.page.scss'],
})
export class MisTareasPage implements OnInit {
  user;
  tareas = [];

  constructor(
    private db: FirebaseService,
    private popoverController: PopoverController,
    private alertController: AlertController
  ) { }

  ngOnInit() {   
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('user'));    
  }

  ionViewDidEnter(){
    this.getTareas();
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

  getTareas() {


    this.db.getCollectionConditional('tareas', ref =>
      ref.where('empleado.id', '==', this.user.id)).subscribe(data => {
        this.tareas = data.map(e => {
          return {
            id: e.payload.doc.id,
            title: e.payload.doc.data()['title'],
            descripcion: e.payload.doc.data()['descripcion'],
            fechaDeCreacion: e.payload.doc.data()['fechaDeCreacion'],
            fechaDeFinalizacion: e.payload.doc.data()['fechaDeFinalizacion'],
            estatus: e.payload.doc.data()['estatus'],
            empleadoCreador: e.payload.doc.data()['empleadoCreador'],
            empleado: e.payload.doc.data()['empleado'],

          };
        });
      }, error => {
        console.log(error)
      });

  }







}
