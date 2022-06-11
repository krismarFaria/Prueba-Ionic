import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupervisorGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let user = JSON.parse(localStorage.getItem('user'))

    if (['1', '2'].includes(user.role.rango)) {
      return true
    }

    if(user.role.rango !== '2' && user.role.rango !== '1'){
      this.router.navigateByUrl('/dashboard/tareas-de-equipo')
      return false
    }
  }
}
