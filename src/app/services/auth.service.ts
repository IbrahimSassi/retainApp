import { Injectable } from '@angular/core';
import { ApiService } from './api';
import { StoreHelper } from './store-helper';
import { Store } from '../store';
import { CanActivate,Router } from '@angular/router';
import 'rxjs/Rx';

@Injectable()

export class AuthService implements CanActivate {
    JWT_KET:string = 'retain_toker';
    constructor(
        private router:Router,
        private apiService:ApiService,
        private storeHelper:StoreHelper,
        private store:Store
        ){
            this.setJwt(window.localStorage.getItem(this.JWT_KET));
        }

    setJwt(jwt:string){
        window.localStorage.setItem(this.JWT_KET,jwt);
        this.apiService.setHeaders({Authorization:`Bearer ${jwt}`});
    }

    authenticate(path,creds){
        return this.apiService.post(`/${path}`,creds)
        .do(res=>this.setJwt(res.token))
        .do(res=> this.storeHelper.update('user',res.data))
        .map(res => res.data);
    }


    signout(){
        window.localStorage.removeItem(this.JWT_KET);
        this.store.purge();
        this.router.navigate(['','auth']);
    }


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