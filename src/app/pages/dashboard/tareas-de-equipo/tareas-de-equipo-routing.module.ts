import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareasDeEquipoPage } from './tareas-de-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: TareasDeEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareasDeEquipoPageRoutingModule {}
