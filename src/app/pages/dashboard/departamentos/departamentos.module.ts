import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartamentosPageRoutingModule } from './departamentos-routing.module';

import { DepartamentosPage } from './departamentos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartamentosPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [DepartamentosPage]
})
export class DepartamentosPageModule {}
