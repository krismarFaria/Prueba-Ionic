import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AngularFireAuth,
    private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      let user = JSON.parse(localStorage.getItem('user'))

      return this.auth.authState.pipe(map(auth => {      

        if(auth && user){
          return true
        }       

        if(!auth || !user){
          console.log(auth);
          
          this.router.navigate(['login']);
          return false
        }
         
      }));
  }  
  
}
