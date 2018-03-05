import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs';

@Injectable()

export class ObservableService {

    private isUserLoggedIn:Subject<any>
    constructor(private http : Http){
        this.isUserLoggedIn= new Subject<any>();
    }

    login(user){
        
        let em : any = {};
        em.email = user.email;
        em.password = user.password;
        console.log(em);
        
        return this.http.post("http://13.58.150.195:4300/logininfo/create", em)
           .map(data => {
               console.log(data.json())
               let result = data.json();
               
               return data.json();
           },
           err => {
               return err.json();
           });
   }
      


}
