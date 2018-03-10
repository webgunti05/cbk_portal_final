import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ObservableService } from '../services/observable.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
import { celebprofile } from '../models/celebprofile';
import { Http, Headers, Response, RequestOptions } from '@angular/http'



@Component({
  selector: 'mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  private email : any;
  private id : any;
  private cc :  celebprofile;
  constructor(private routSvc: Router, public route: ActivatedRoute, private cbOvc: ObservableService) {
    this.email = this.email;
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

    this.getMemberByEmail(this.email);
  }

  profilePage(){
    //this.routSvc.navigateByUrl('/profile');
    this.routSvc.navigate(['/profile/', { email: this.email, id: this.id  }]);
  }

  celebPage() {
    this.routSvc.navigate(['/celebrities/', { email: this.email, id : this.id }]);
    // this.routSvc.navigateByUrl('/celebrities' email:);
  }

  transactionPage(){
    this.routSvc.navigateByUrl('/transactions');
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

}
