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

  getMemberByID(id: any) {
    return this.http.get('http://13.58.150.195:4300/users/getMember/' + id + '').map((res: Response) => res.json());
  }


  sendCelebRequest(id) {
    
    let body : any = {};
    body.memberId = id;
    return this.http.post('http://13.58.150.195:4300/celebrequest/create/', body ).map((res: Response) => res.json());
  }

  //updateUserById(id) {
  //  return this.http.post('http://13.58.150.195:4300/users/editUser/', id).map((res: Response) => res.json());
  //}

  onUpdateMember(member: any) {
    var st: string = member.isCeleb.toString();

    
    let body: any = {};
    body.id = member._id.toString();
    body.status = member.status.toString();
    body.address = member.address;
    body.availableCredits = member.availableCredits;
    body.dateOfBirth = member.dateOfBirth;
    body.email = member.email;
    body.gender = member.gender;
    body.location = member.location;
    body.loginType = member.loginType;
    body.mobileNumber = member.mobileNumber;
    body.name = member.name;
    body.password = member.password;
    body.username = member.username;
    body.preferences = member.preferences;
    body.IsDeleted = member.IsDeleted.toString();
    body.aboutMe = member.aboutMe;
    body.avtar_imgPath = member.avtar_imgPath;
    body.avtar_originalname = member.avtar_originalname;
    body.created_at = member.created_at;
    body.isCeleb = st;
    body.lastName = member.lastName;
    body.prefix = member.prefix;
    body.role = member.role;
    body.isTrending = member.isTrending.toString();
    body.isEditorChoice = member.isEditorChoice.toString();
    body.isOnline = member.isOnline.toString();
    body.isPromoted = member.isPromoted.toString();
    // body.status = member.status.toString();
    //body.updated_at = member.updated_at;
    body.updated_at = member.updated_at == null ? "" : member.updated_at;
    body.v = member.__v.toString();
    body.celebToManager = member.celebToManager;
    console.log(body);
    return this.http.post('http://13.58.150.195:4300/users/editUser', body).map((res: Response) =>
      res.json());
  }


  onfileupload(id: any, formdata: any) {
    //formdata.id = "5a9cd36741249d75a4d62834";
    //formdata.avtar_imgPath = "2";
    return this.http.post('http://13.58.150.195:4300/users/editUser', formdata).map((res: Response) =>
      res.json());
  }


}
