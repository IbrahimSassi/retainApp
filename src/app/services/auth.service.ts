import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
@Injectable()

export class AuthService implements CanActivate {
    JWT_KET:string = 'retain_toker';
    constructor(private router:Router){}


    isAuthorized():boolean{
        return Boolean(window.localStorage.getItem(this.JWT_KET));
    }


    canActivate():boolean{
        const isAuth = this.isAuthorized();

        if(!isAuth){
            this.router.navigate(['','auth'])
        }
        return isAuth;
    }
}