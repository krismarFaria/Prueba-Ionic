import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormTareaComponent } from '../form-tarea/form-tarea.component';

@Component({
  selector: 'app-opciones-tarea',
  templateUrl: './opciones-tarea.component.html',
  styleUrls: ['./opciones-tarea.component.scss'],
})
export class OpcionesTareaComponent implements OnInit {

  @Input() tarea;

  constructor(
    private modalController: ModalController,
    private popoverController: PopoverController,
    private db: FirebaseService
  ) { }

  ngOnInit() { }

  async editarTarea() {
    this.popoverController.dismiss();
    const modal = await this.modalController.create({
      component: FormTareaComponent,
      componentProps: { tarea: this.tarea },
      cssClass: 'editar-tarea-modal'
    });

    await modal.present();

  }

  deleteTarea() {
    this.popoverController.dismiss();
    this.db.deleteFromCollection('tareas', this.tarea.id).then(res => {
      this.db.Toast('Eliminacion exitosa')
    }, error => {
      this.db.Toast(error.message)
    })
  }

}
