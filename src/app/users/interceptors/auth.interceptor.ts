import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import construct = Reflect.construct;
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    return next.handle(req).pipe(
      catchError(e => {
        if(e.status == 401){
          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }

        if(e.status == 403){
          swal.fire('Access denied', `Access denied for ${this.authService.user.username}`,'warning');
          this.router.navigate(['/customers']);
        }
        return throwError(e);
      })
    );
  }

}
