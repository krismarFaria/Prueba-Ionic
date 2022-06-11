import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FirebaseService } from 'src/app/services/firebase.service';

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
 user = JSON.parse(localStorage.getItem('user'));
  constructor(private router: Router,
    private firebaseService: FirebaseService) {

    this.router.events.subscribe((event: RouterEvent) => {
      if(event && event.url){
        this.selectedPath = event.url;
      }
    });
   }


  ngOnInit() {    
  }

  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ionViewDidEnter(){
    if(this.user.role.rango == '1'){
      this.pages = [
        { title: 'Crear tarea', url: '/dashboard/crear-tarea'},
        { title: 'Mis tareas', url: '/dashboard/mis-tareas' },
        { title: 'Tareas de equipo', url: '/dashboard/tareas-de-equipo' },
        { title: 'Roles', url: '/dashboard/roles'},
        { title: 'Departamentos', url: '/dashboard/departamentos'},
        { title: 'Empleados', url: '/dashboard/empleados'},
     ]     
    }

    if(this.user.role.rango == '2'){
      this.pages = [
        { title: 'Crear tarea', url: '/dashboard/crear-tarea'},
        { title: 'Mis tareas', url: '/dashboard/mis-tareas' },
        { title: 'Tareas de equipo', url: '/dashboard/tareas-de-equipo' }         
     ]
    }
    
    if(this.user.role.rango == '3'){
      this.pages = [      
        { title: 'Mis tareas', url: '/dashboard/mis-tareas' },
        { title: 'Tareas de equipo', url: '/dashboard/tareas-de-equipo'}             
     ]
    }
  }

  logout() {
    this.firebaseService.logout()
  }


  
 
}
