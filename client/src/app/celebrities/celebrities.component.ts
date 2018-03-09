import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ObservableService } from '../services/observable.service';
import { celebprofile } from '../models/celebprofile';

@Component({
  selector: 'celebrities',
  templateUrl: './celebrities.component.html',
  styleUrls: ['./celebrities.component.css']
})
export class CelebritiesComponent implements OnInit {

  Celebrities: Array<any>;
  private email : any;
  private id : any;
  celebsProfile: celebprofile[];
  interests: celebprofile[];
  imageUrl: any = "http://13.58.150.195:4300/";
  public test: any;

  constructor(private routSvc : Router, private cbOvc : ObservableService, public route : ActivatedRoute) {
    this.cbOvc.getCelebrities(this.email)
    .subscribe(res => this.Celebrities = res);
    console.log(this.Celebrities);

  }

  ngOnInit() {
     this.route.params.subscribe(params => {
       this.email = params['email'];
       console.log(this.email);
      // this.test = this.getMemberByEmail(this.email);
       //  .subscribe(data => {
       //  this.id = data._id;
       //  console.log(this.id);
       //});

       //this.getlistofinterests(this.test);
    });
     this.test = this.getMemberByEmail(this.email);
     alert(this.test);
     this.getlistofinterests(this.test);
    this.route.params.subscribe(params => {
      this.id = params['id'];
     // console.log("mid:" + this.id);
    });

    this.getCelebrityById();
   
  }

  profilePage(){
    this.routSvc.navigateByUrl('/profile');
  }
  
  celebPage(){
    this.routSvc.navigate(['/celebrities/', { id:this.id }]);
  }
  
  transactionPage(){
    this.routSvc.navigateByUrl('/transactions');
  }

  getCelebrityById(){
    
    this.cbOvc.getCelebrityById(this.id).subscribe(data => {
    this.celebsProfile = data;
    console.log("celebsProfile:" +data);
    });
    return this.celebsProfile;
  }


  getMemberByEmail(email: any) {
    email = this.email;
    this.cbOvc.getMemberByEmail(this.email).subscribe(x => {
      console.log("testingid"+ x._id);
      this.id = x._id;
     // this.test = x._id;
      console.log("final" + this.id);
    });
    return this.id;
  }


  getlistofinterests(id:any) {
    id = this.id;
    console.log("tr" + this.test);
    this.cbOvc.getCelebrityById(this.id).subscribe(interests => {
      this.interests = interests;
      console.log(interests);
    });
   // return this.interests;
  }
 
}
