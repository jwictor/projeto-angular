import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class jwtInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('access_token');

        if(typeof token === 'string'){
            req = req.clone({setHeaders: {Authorization: `Bearer ${token}`}})
        }

        return next.handle(req);
    }


}