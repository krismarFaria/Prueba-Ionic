import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'crear-tarea',
        loadChildren: () => import('./crear-tarea/crear-tarea.module').then( m => m.CrearTareaPageModule)
      },
      {
        path: 'mis-tareas',
        loadChildren: () => import('./mis-tareas/mis-tareas.module').then( m => m.MisTareasPageModule)
      },
      {
        path: 'tareas-de-equipo',
        loadChildren: () => import('./tareas-de-equipo/tareas-de-equipo.module').then( m => m.TareasDeEquipoPageModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then( m => m.RolesPageModule)
      },
      {
        path: 'departamentos',
        loadChildren: () => import('./departamentos/departamentos.module').then( m => m.DepartamentosPageModule)
      },
      {
        path: 'empleados',
        loadChildren: () => import('./empleados/empleados.module').then( m => m.EmpleadosPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
