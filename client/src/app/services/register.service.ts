import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Members } from '../models/memberregistration';
import { Preferences } from '../models/preferences';


@Injectable()

export class RegisterService {
  //http: Http;
  constructor(private http: Http) {

  }


  onRegisterMember(member: any) {
    console.log(member);
    let body: any = {};
    body.name = member.firstname;
    body.username = member.firstname + member.lastname;
    body.mobileNumber = member.mobileNumber;
    body.location = member.location;
    body.profilePic = "";
    body.dateOfBirth = member.dateOfBirth;
    body.address = member.location;
    body.availableCredits = "0".toString();
    body.profession = member.profession;
    body.password = member.password;
    body.confirmPassword = member.confirmPassword;
    body.email = member.email;
    body.gender = member.gender;
    body.loginType = "Web Portal";
    body.country = member.country;
    body.role = "member";
    console.log(body);
    return this.http.post('http://13.58.150.195:4300/users/memberRegistrations', body).map((res: Response) =>
      res.json());
  }

  onComLog(member: any) {

    let comlog: any = {};
    comlog.mode_ids = "email";
    comlog.from_addr = "";
    comlog.to_addr = member.email;
    comlog.content = "";

    return this.http.post('http://13.58.150.195:4300/comLog/createComLog', comlog).map((res: Response) =>
      res.json());
  }

  onCreateInfo(member: any) {
    let create: any = {};
    create.email = member.email;
    create.username = member.firstname + member.lastname;
    create.password = member.password;
    create.mobileNumber = member.mobileNumber;
    return this.http.post('http://13.58.150.195:4300/logininfo/create', create).map((res: Response) =>
      res.json());
  }

  onGetMemberByEmail(email: any){
    console.log("Service:"+ email);
    return this.http.get('http://13.58.150.195:4300/users/getMemberByEmail/' + email + '').map((res: Response) => res.json());

  }
  
  onGetPreferencesList(): Observable<Preferences[]> {
    return this.http.get('http://13.58.150.195:4300/preferences/getPreferencesList').map((res: Response) =>
      res.json());
  }

  onAddPreferences(userId: any, preferences: any) {
    console.log(userId);
    console.log(preferences);
    let body: any = {};
    body.userId = userId;
    body.preferences =preferences;
    console.log(body);
    return this.http.post(' http://13.58.150.195:4300/memberpreferences/setMemberPreferences', body).map((res: Response) =>
      res.json());
  }

  onGetCelebritiesByPreferences(userid:any): Observable<Members[]> {
    return this.http.get('http://13.58.150.195:4300/memberpreferences/getCelebritiesBySelectedPreferences/' + userid + '').map((res: Response) =>
      res.json());
  }


  onGetMemberById(user_id: any) {
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    //let params = new URLSearchParams();
    //params.append("user_id", user_id)

    //let params = new HttpParams().set("user_id", user_id);

    return this.http.get('http://13.58.150.195:4300/users/getMember/' + user_id + '').map((res: Response) =>
      res.json());
    // }
  }

}
