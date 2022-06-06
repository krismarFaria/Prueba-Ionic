import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisTareasPageRoutingModule } from './mis-tareas-routing.module';

import { MisTareasPage } from './mis-tareas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisTareasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MisTareasPage]
})
export class MisTareasPageModule {}
