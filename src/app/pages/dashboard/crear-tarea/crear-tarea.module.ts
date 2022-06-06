import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearTareaPageRoutingModule } from './crear-tarea-routing.module';

import { CrearTareaPage } from './crear-tarea.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearTareaPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [CrearTareaPage]
})
export class CrearTareaPageModule {}
