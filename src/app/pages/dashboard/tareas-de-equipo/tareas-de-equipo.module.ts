import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareasDeEquipoPageRoutingModule } from './tareas-de-equipo-routing.module';

import { TareasDeEquipoPage } from './tareas-de-equipo.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareasDeEquipoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TareasDeEquipoPage]
})
export class TareasDeEquipoPageModule {}
