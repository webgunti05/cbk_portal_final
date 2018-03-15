import { Subject } from 'rxjs/Rx';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
//import { member } from '../models/member';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()

export class ObservableService {

    private isUserLoggedIn:Subject<any>
    result : any;
    id: number;
    authToken;
    user;
    options;

    constructor(private http : Http){
        this.isUserLoggedIn= new Subject<any>();
    }

    createAuthenticationHeaders() {
      this.loadToken();
      this.options = new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': this.authToken
        })
      });
    }

    loadToken() {
      this.authToken = localStorage.getItem('token');
    }

    logout() {
      this.authToken = null;
      this.user = null;
      localStorage.clear();
    }

    storeUserData(token, user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user))
      this.authToken = token;
      this.user = user;
    }

    loggedIn() {
      return tokenNotExpired();
    }

    login(user){
        
        let em : any = {};
        em.email = user.email;
        em.password = user.password;
        console.log(em);
        
        return this.http.post("http://13.58.150.195:4300/logininfo/login", em)
           .map(data => {
               console.log(data.json())
               return data.json();
           },
           err => {
               return err.json();
           });
   }
      
// getting celebrities from db

getCelebrities(email : any) : Observable<any[]>{
    return this.http.get("http://13.58.150.195:4300/memberpreferences/getMemberPreferencesByEmail/' + email + '")
    .map(result => this.result = result.json().data);
}

getMemberByEmail(email:any): Observable<any>{
    let body:any=[];
    body.email=email;
  console.log(email);

  return this.http.get('http://13.58.150.195:4300/users/getMemberByEmail/' + email + '').map((res:Response)=>res.json());
    // .map(result => this.result = result.json().data);

}

  getCelebrityById(id: number): Observable<any[]>{
    this.id = id;
    console.log("Celeb id:" + id);
    return this.http.get('http://13.58.150.195:4300/memberpreferences/getCelebritiesBySelectedPreferences/' + id + '')
      .map((res: Response)=>res.json());
}

  onGetProfileByEmail(emailid: any): Observable<any> {
    console.log("service" + emailid);
  return this.http.get('http://13.58.150.195:4300/users/getMemberByEmail/' + emailid + '').map((res: Response) =>
      res.json());
  }

  onGetContentByID(id: any): Observable<any[]> {
    return this.http.get('http://13.58.150.195:4300/feeddata/getFeedByMemberId/' + id + '').map((res: Response) => res.json());
  }

  onGetTransactions(id : any): Observable<any[]> {
    return this.http.get('http://13.58.150.195:4300/financialTransaction/getByUserID/' + id + '').map((res: Response) => res.json());
  }

  getAllCelebrities() {
    return this.http.get('http://13.58.150.195:4300/users/getMemberByisCeleb').map((res: Response) => res.json());
  }


}
