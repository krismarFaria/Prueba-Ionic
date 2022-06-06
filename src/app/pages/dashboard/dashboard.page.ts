import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  pages = [
    { title: 'Crear tarea', url: '/dashboard/crear-tarea'},
    { title: 'Mis tareas', url: '/dashboard/mis-tareas' },
    { title: 'Tareas de equipo', url: '/dashboard/tareas-de-equipo' },
    { title: 'Roles', url: '/dashboard/roles'},
    { title: 'Departamentos', url: '/dashboard/departamentos'},
    { title: 'Empleados', url: '/dashboard/empleados'},
 ];

 selectedPath = '';

  constructor(private router: Router) {

    this.router.events.subscribe((event: RouterEvent) => {
      if(event && event.url){
        this.selectedPath = event.url;
      }
    });
   }


  ngOnInit() {
  }

  logout(url){
    if(url === 'logout'){
 this.router.navigate(['login']);
    }
  }
}
