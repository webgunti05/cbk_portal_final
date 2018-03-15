import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ObservableService } from '../services/observable.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { celebprofile } from '../models/celebprofile';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { member } from '../models/member';



@Component({
  selector: 'mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  private email : any;
  private id : any;
  private cc: celebprofile;

  Celebrities: Array<any>;
 
  celebsProfile: celebprofile[];
  interests: celebprofile[];
  imageUrl: any = "http://13.58.150.195:4300/";
  public test: any;
  private name = localStorage.getItem('loginSessId');

  isClassVisible: false;

  private profile: member;

  constructor(private routSvc: Router, public route: ActivatedRoute, private cbOvc: ObservableService) {
   
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
     this.email = params['email'];
     console.log("email:"+this.email);
    });

      this.route.params.subscribe(params => {
        this.id =params['id'];
        console.log("id:"+this.id);
      });
      this.email = localStorage.getItem('loginSessId');
      this.getMemberByEmail(this.email);
      this.test = this.getMemberByEmail(this.email);
      this.getlistofinterests(this.test);
      this.getCelebrityById(this.id);
      this.ongetprofilebyemail(this.email);

  }

  profilePage(){
    //this.routSvc.navigateByUrl('/profile');
    this.routSvc.navigate(['/profile/']);
  }

  celebPage() {
    this.routSvc.navigate(['/celebrities/']);
    // this.routSvc.navigateByUrl('/celebrities' email:);
  }

  transactionPage(){
    this.routSvc.navigate(['/transactions/']);
  }

  //getMemberByEmail(email : any){
  //  this.email = email;
  //  this.cbOvc.getMemberByEmail(email).subscribe(data => {
  //    console.log(data);

  //    });
  //}

  getMemberByEmail(email: any) {
    email = this.email;
    this.cbOvc.getMemberByEmail(this.email).subscribe(x => {
      console.log("testingid" + x._id);
      this.id = x._id;

      console.log("final" + this.id);
    });
    return this.id;
  }

  getCelebrityById(id: any) {
    id = this.id;
    this.cbOvc.getCelebrityById(id).subscribe(data => {
      this.celebsProfile = data;
      console.log("celebsProfile:" + data);
    });
    return this.celebsProfile;
  }


  getlistofinterests(id: number) {
    id = this.id;
    console.log("tr" + this.test);
    this.cbOvc.getCelebrityById(this.id).subscribe(interests => {
      this.interests = interests;
      console.log(interests);
    });
    // return this.interests;
  }

  ongetprofilebyemail(email: any) {
    this.email = email;
    this.cbOvc.onGetProfileByEmail(email).subscribe(data => {
      this.profile = data;
      console.log(data);
    });


  }

}
