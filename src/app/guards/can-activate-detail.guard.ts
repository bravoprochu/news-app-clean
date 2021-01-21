import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateDetailGuard implements  CanActivate {
  constructor(private router: Router) {}
  
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    
    const data = this.router.getCurrentNavigation().extras.state;

    if(data) {
      return true;
    } else{
      this.router.navigateByUrl("news");
    }
  }
}
