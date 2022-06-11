import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperUsuarioGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let user = JSON.parse(localStorage.getItem('user'))

    if (user.role.rango == '1') {
      return true
    }

    if(user.role.rango == '2'){
      this.router.navigateByUrl('/dashboard/crear-tarea')
      return false
    }

    if(user.role.rango == '3'){
      this.router.navigateByUrl('/dashboard/tareas-de-equipo')
      return false
    }
    
  
  }
}
