import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';



@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (req.url.includes("/api/v1/signup") || req.url.includes("assets/")) {
    return next.handle(req);
    // }
    // return this.sessionService.getCurrentUser().pipe(
    //   switchMap(jwtToken => {
    //       const authReq = req.clone({
    //         headers: req.headers.set('Authorization', `${jwtToken.signInUserSession.idToken.jwtToken}`)
    //       });

    //       return next.handle(authReq);
    //   })
    // );
  }
}
